# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/create_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Operations::Sources::CreateOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:operation) { described_class.new }

  let(:record_class) { Source }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:attributes)     { {} }
    let(:origin)         { FactoryBot.build(:book) }
    let(:origin_id)      { origin&.id }
    let(:origin_type)    { origin&.class&.name }
    let(:reference)      { FactoryBot.build(:spell) }
    let(:reference_id)   { reference&.id }
    let(:reference_type) { reference&.class&.name }

    def call_operation
      operation.call(attributes: attributes)
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes)
    end

    describe 'with no arguments' do
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['origin_id', "can't be blank"]])
      end

      def call_operation
        operation.call
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    include_examples 'should validate the attributes'

    describe 'with an empty hash' do
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['origin_id', "can't be blank"]])
      end
      let(:attributes) { {} }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a hash with valid attributes' do
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['origin_id', "can't be blank"]])
      end
      let(:attributes) do
        { 'metadata' => { 'key' => 'value' } }
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    include_examples 'should resolve the polymorphic association',
      :origin,
      permitted_types: { not: 'Spell' }

    describe 'with an origin' do
      let(:attributes) { super().merge(origin: origin) }

      before(:example) { origin.save! }

      include_examples 'should validate the attributes'

      describe 'with an empty hash' do
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['reference_id', "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a hash with valid attributes' do
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['reference_id', "can't be blank"]])
        end
        let(:attributes) do
          super().merge('metadata' => { 'key' => 'value' })
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      include_examples 'should resolve the polymorphic association',
        :reference,
        permitted_types: { not: 'Book' }
    end

    describe 'with an origin and a reference' do
      let(:attributes) { super().merge(origin: origin, reference: reference) }

      before(:example) do
        origin.save!
        reference.save!
      end

      include_examples 'should validate the attributes'

      describe 'with an empty hash' do
        let(:source) { call_operation.value }
        let(:expected) do
          Source.new(attributes).attributes.merge(
            'id'         => a_uuid,
            'created_at' => an_instance_of(ActiveSupport::TimeWithZone),
            'metadata'   => {
              'name'     => origin.title,
              'playtest' => origin.playtest
            },
            'updated_at' => an_instance_of(ActiveSupport::TimeWithZone)
          )
        end

        it { expect(call_operation).to have_passing_result }

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it { expect(source).to be_a Source }

        it { expect(source.attributes).to deep_match expected }

        it { expect(source.persisted?).to be true }
      end

      describe 'with a hash with valid attributes' do
        let(:attributes) do
          super().merge('metadata' => { 'key' => 'value' })
        end
        let(:source) { call_operation.value }
        let(:expected) do
          Source.new(attributes).attributes.merge(
            'id'         => a_uuid,
            'created_at' => an_instance_of(ActiveSupport::TimeWithZone),
            'metadata'   => attributes['metadata'].merge(
              'name'     => origin.title,
              'playtest' => origin.playtest
            ),
            'updated_at' => an_instance_of(ActiveSupport::TimeWithZone)
          )
        end

        it { expect(call_operation).to have_passing_result }

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it { expect(source).to be_a Source }

        it { expect(source.attributes).to deep_match expected }

        it { expect(source.persisted?).to be true }
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
