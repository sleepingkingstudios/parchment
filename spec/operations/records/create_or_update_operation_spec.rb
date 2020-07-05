# frozen_string_literal: true

require 'rails_helper'

require 'operations/attributes/generate_slug'
require 'operations/records/create_or_update_operation'

require 'support/examples/operation_examples'

# rubocop:disable RSpec/NestedGroups
# rubocop:disable RSpec/RepeatedDescription
# rubocop:disable RSpec/RepeatedExample
RSpec.describe Operations::Records::CreateOrUpdateOperation do
  include Spec::Support::Examples::OperationExamples

  shared_context 'when initialized with find_by: one attribute' do
    let(:find_by)             { :name }
    let(:constructor_options) { super().merge(find_by: find_by) }
  end

  shared_context 'when initialized with find_by: many attributes' do
    let(:find_by)             { %i[duration range ritual] }
    let(:constructor_options) { super().merge(find_by: find_by) }
  end

  subject(:operation) do
    described_class.new(record_class, **constructor_options)
  end

  let(:record_class)        { Spell }
  let(:constructor_options) { {} }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:find_by)
    end

    describe 'with find_by: nil' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: nil) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: Object' do
      let(:error_message) do
        'find_by must be an attribute or array of attributes'
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: Object.new.freeze) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an empty string' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: '') }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an empty symbol' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: :'') }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an empty array' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: []) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an array with nil' do
      let(:error_message) do
        'find_by must be an attribute or array of attributes'
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: [nil]) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an array with an Object' do
      let(:error_message) do
        'find_by must be an attribute or array of attributes'
      end

      it 'should raise an exception' do
        expect do
          described_class.new(record_class, find_by: [Object.new.freeze])
        end
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an array with an empty string' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: ['']) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with find_by: an array with an empty symbol' do
      let(:error_message) do
        "find_by can't be blank"
      end

      it 'should raise an exception' do
        expect { described_class.new(record_class, find_by: [:'']) }
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#call' do
    shared_examples 'should create the record' do
      let(:record) { call_operation.value }
      let(:expected) do
        record_class
          .new
          .attributes
          .merge(attributes.stringify_keys)
          .merge(
            'id'         => a_uuid,
            'created_at' => an_instance_of(ActiveSupport::TimeWithZone),
            'updated_at' => an_instance_of(ActiveSupport::TimeWithZone)
          )
      end

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }

      it { expect(record.persisted?).to be true }

      it { expect { call_operation }.to change(Spell, :count).by(1) }
    end

    shared_examples 'should update the record' do
      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(record)
      end

      it 'should update the attributes' do
        expect { call_operation }
          .to change { record.reload.attributes }
          .to be >= attributes.except(:id).stringify_keys
      end
    end

    let(:attributes) { {} }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    context 'when querying by primary key' do
      let(:id) { '00000000-0000-0000-0000-000000000000' }

      before(:example) { attributes.update(id: id) }

      include_examples 'should validate the primary key'

      context 'when the record does not exist' do
        include_examples 'should handle invalid attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: 'Power Word: Autodefenestrate',
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should create the record'
        end
      end

      context 'when the record exists' do
        let(:record) { FactoryBot.build(:spell) }
        let(:id)     { record.id }
        let(:expected_validation_error) do
          operation          = Operations::Attributes::GenerateSlug.new
          invalid_attributes =
            attributes.merge(slug: operation.call(attributes[:name]).value)
          invalid_record     = record_class.new(invalid_attributes)

          Errors::FailedValidation.new(record: invalid_record.tap(&:valid?))
        end

        before(:example) { record.save! }

        include_examples 'should handle invalid attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: 'Power Word: Autodefenestrate',
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should update the record'
        end
      end
    end

    context 'when querying by one attribute' do
      include_context 'when initialized with find_by: one attribute'

      let(:name) { 'Power Word: Autodefenestrate' }

      before(:example) { attributes.update(name: name) }

      context 'when the record does not exist' do
        include_examples 'should handle invalid attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: name,
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should create the record'
        end
      end

      context 'when the record exists' do
        let(:record) { FactoryBot.build(:spell, name: name) }
        let(:expected_validation_error) do
          other_name       = 'Power Word: Antidisestablishmentarianism'
          other_slug       = 'power-word-antidisestablishmentarianism'
          other_attributes =
            attributes.merge(name: other_name, slug: other_slug)

          Errors::FailedValidation.new(
            record: record_class.new(other_attributes).tap(&:valid?)
          )
        end

        before(:example) { record.save! }

        include_examples 'should handle invalid attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: 'Power Word: Autodefenestrate',
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should update the record'
        end
      end

      context 'when the record is not unique' do
        let(:find_by) { :school }
        let(:school)  { Spell::Schools::DIVINATION }
        let(:records) do
          Array.new(3) { FactoryBot.build(:spell, school: school) }
        end
        let(:expected_error) do
          Errors::NotUnique.new(
            attributes:   { school: school },
            record_class: record_class,
            records:      records
          )
        end

        before(:example) do
          attributes
            .tap { |hsh| hsh.delete(:name) }
            .update(school: school)

          records.each(&:save!)
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        it 'should not update the records' do
          expect { call_operation }
            .not_to(change { records.map(&:reload).map(&:attributes) })
        end
      end
    end

    context 'when querying by many attributes' do
      include_context 'when initialized with find_by: many attributes'

      let(:duration) { '1 day' }
      let(:range)    { 'Self' }
      let(:ritual)   { true }

      before(:example) do
        attributes.update(
          duration: duration,
          range:    range,
          ritual:   ritual
        )
      end

      context 'when the record does not exist' do
        include_examples 'should handle invalid attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it { expect { call_operation }.not_to change(record_class, :count) }
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: 'Power Word: Autodefenestrate',
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should create the record'
        end
      end

      context 'when the record exists' do
        let(:record) do
          FactoryBot.build(
            :spell,
            duration: duration,
            range:    range,
            ritual:   ritual
          )
        end
        let(:expected_validation_error) do
          operation          = Operations::Attributes::GenerateSlug.new
          invalid_attributes =
            attributes.merge(slug: operation.call(attributes[:name]).value)
          invalid_record     = record_class.new(invalid_attributes)

          Errors::FailedValidation.new(record: invalid_record.tap(&:valid?))
        end

        before(:example) do
          FactoryBot.create(
            :spell,
            duration: '1 hour',
            range:    range,
            ritual:   ritual
          )
          FactoryBot.create(
            :spell,
            duration: duration,
            range:    '30 feet',
            ritual:   ritual
          )
          FactoryBot.create(
            :spell,
            duration: duration,
            range:    range,
            ritual:   false
          )

          record.save!
        end

        include_examples 'should handle invalid attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        include_examples 'should handle unknown attributes',
          lambda {
            it 'should not update the record' do
              expect { call_operation }
                .not_to change(record.reload, :attributes)
            end
          }

        describe 'with valid attributes' do
          let(:attributes) do
            FactoryBot.attributes_for(
              :spell,
              name: 'Power Word: Autodefenestrate',
              slug: 'power-word-autodefenestrate'
            )
          end

          include_examples 'should update the record'
        end
      end

      context 'when the record is not unique' do
        let(:records) do
          Array.new(3) do
            FactoryBot.build(
              :spell,
              duration: duration,
              range:    range,
              ritual:   ritual
            )
          end
        end
        let(:expected_error) do
          Errors::NotUnique.new(
            attributes:   { duration: duration, range: range, ritual: ritual },
            record_class: record_class,
            records:      records
          )
        end

        before(:example) { records.each(&:save!) }

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        it 'should not update the records' do
          expect { call_operation }
            .not_to(change { records.map(&:reload).map(&:attributes) })
        end
      end
    end
  end

  describe '#query_params' do
    include_examples 'should have private reader', :query_params, %i[id]

    wrap_context 'when initialized with find_by: one attribute' do
      it { expect(operation.send :query_params).to be == %i[name] }

      context 'when the attribute is a string' do
        let(:find_by) { super().to_s }

        it { expect(operation.send :query_params).to be == %i[name] }
      end
    end

    wrap_context 'when initialized with find_by: many attributes' do
      let(:expected) { %i[duration range ritual] }

      it { expect(operation.send :query_params).to be == expected }

      context 'when the attributes are strings' do
        let(:find_by) { super().map(&:to_s) }

        it { expect(operation.send :query_params).to be == expected }
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
# rubocop:enable RSpec/NestedGroups
# rubocop:enable RSpec/RepeatedDescription
# rubocop:enable RSpec/RepeatedExample
