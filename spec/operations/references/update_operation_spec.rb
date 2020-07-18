# frozen_string_literal: true

require 'rails_helper'

require 'operations/attributes/generate_slug'
require 'operations/references/update_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'

RSpec.describe Operations::References::UpdateOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    shared_context 'when the reference already has a source' do
      let(:old_origin) { FactoryBot.build(:book, title: 'Old Origin') }
      let(:old_source) do
        FactoryBot.build(:source, origin: old_origin, reference: reference)
      end

      before(:example) do
        old_origin.save!
        old_source.save!
      end
    end

    let(:attributes)  { {} }
    let(:expected)    { record.attributes }
    let(:record)      { FactoryBot.build(:spell) }
    let(:reference)   { record }
    let(:origin)      { FactoryBot.build(:book, title: 'New Origin') }
    let(:origin_id)   { origin&.id }
    let(:origin_type) { origin&.class&.name }
    let(:expected_validation_error) do
      operation          = Operations::Attributes::GenerateSlug.new
      invalid_attributes =
        attributes.merge(slug: operation.call(attributes[:name]).value)
      invalid_record     = record_class.new(invalid_attributes)

      Errors::FailedValidation.new(record: invalid_record.tap(&:valid?))
    end

    def call_operation
      operation.call(attributes: attributes, record: record)
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes, :record)
    end

    include_examples 'should validate the attributes'

    include_examples 'should validate the record'

    # rubocop:disable RSpec/RepeatedExample
    include_examples 'should handle invalid attributes',
      lambda {
        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= attributes.stringify_keys
        end

        it { expect { call_operation }.not_to change(record, :persisted?) }
      }

    include_examples 'should handle unknown attributes',
      lambda {
        it { expect { call_operation }.not_to change(record, :attributes) }

        it { expect { call_operation }.not_to change(record, :persisted?) }
      }
    # rubocop:enable RSpec/RepeatedExample

    describe 'with a record with valid attributes' do
      let(:attributes) do
        {
          'name'         => 'Glowing Gaze',
          'casting_time' => '1 reaction, which you take when a creature ' \
                            'within range takes fire damage',
          'duration'     => 'Instantaneous',
          'level'        => 1,
          'range'        => '60 feet',
          'school'       => Spell::Schools::EVOCATION,
          'description'  => <<~DESCRIPTION
            Your eyes glow with an inner fire. The target creature must make a
            Dexterity saving throw. A target takes 2d6 fire damage on a failed
            save, or half as much damage on a successful one.

            **At Higher Levels:** When you cast this spell using a spell slot of
            2nd level or higher, the damage increases by 1d6 for each slot level
            above 1st.
          DESCRIPTION
        }
      end
      let(:expected) do
        super()
          .merge('slug' => 'glowing-gaze')
          .merge(attributes)
          .except('updated_at')
      end

      before(:example) do
        record.save!

        expected
      end

      include_examples 'should resolve the polymorphic association',
        :origin,
        permitted_types: { not: 'Spell' }

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it 'should update the attributes' do
        expect { call_operation }
          .to change(record, :attributes)
          .to be >= expected
      end

      it { expect { call_operation }.not_to change(Source, :count) }

      it { expect { call_operation }.not_to change(record, :source) }

      wrap_context 'when the reference already has a source' do
        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= attributes
        end

        it { expect { call_operation }.to change(Source, :count).by(-1) }

        it { expect { call_operation }.to change(record, :source).to be nil }
      end

      describe 'with an empty slug' do
        let(:attributes) { super().merge('slug' => '') }
        let(:expected)   { super().merge('slug' => 'glowing-gaze') }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end
      end

      describe 'with a non-empty slug' do
        let(:attributes) { super().merge('slug' => 'custom-slug') }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end
      end

      describe 'with a valid origin id and type' do
        let(:attributes) do
          super().merge(origin_id: origin_id, origin_type: origin_type)
        end
        let(:expected) { attributes.except(:origin_id, :origin_type) }

        before(:example) { origin.save! }

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it 'should set the source' do
          expect { call_operation }.to change(record, :source)
        end

        it 'should set the source origin' do
          expect { call_operation }.to(
            change { record.source&.origin }.to be == origin
          )
        end

        it 'should set the source reference' do
          expect { call_operation }.to(
            change { record.source&.reference }.to be == reference
          )
        end

        wrap_context 'when the reference already has a source' do
          it 'should return a passing result' do
            expect(call_operation).to have_passing_result.with_value(record)
          end

          it { expect { call_operation }.not_to change(Source, :count) }

          it 'should set the source' do
            expect { call_operation }.to change(record, :source)
          end

          it 'should set the source origin' do
            expect { call_operation }.to(
              change { record.source&.origin }.to be == origin
            )
          end

          it 'should set the source reference' do
            expect { call_operation }.not_to(
              change { record.source&.reference }
            )
          end
        end
      end

      describe 'with a valid origin' do
        let(:attributes) { super().merge(origin: origin) }
        let(:expected)   { attributes.except(:origin) }

        before(:example) { origin.save! }

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it 'should set the source' do
          expect { call_operation }.to change(record, :source)
        end

        it 'should set the source origin' do
          expect { call_operation }.to(
            change { record.source&.origin }.to be == origin
          )
        end

        it 'should set the source reference' do
          expect { call_operation }.to(
            change { record.source&.reference }.to be == reference
          )
        end

        wrap_context 'when the reference already has a source' do
          it 'should return a passing result' do
            expect(call_operation).to have_passing_result.with_value(record)
          end

          it { expect { call_operation }.not_to change(Source, :count) }

          it 'should set the source' do
            expect { call_operation }.to change(record, :source)
          end

          it 'should set the source origin' do
            expect { call_operation }.to(
              change { record.source&.origin }.to be == origin
            )
          end

          it 'should set the source reference' do
            expect { call_operation }.not_to(
              change { record.source&.reference }
            )
          end
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
