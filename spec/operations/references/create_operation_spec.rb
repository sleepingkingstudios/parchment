# frozen_string_literal: true

require 'rails_helper'

require 'operations/attributes/generate_slug'
require 'operations/references/create_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Operations::References::CreateOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes)  { {} }
    let(:expected)    { record_class.new.attributes }
    let(:record)      { call_operation.value }
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
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(0..1).arguments }

    include_examples 'should validate the attributes'

    # rubocop:disable RSpec/RepeatedExample
    include_examples 'should handle invalid attributes',
      lambda {
        it { expect { call_operation }.not_to change(Spell, :count) }
      }

    include_examples 'should handle unknown attributes',
      lambda {
        it { expect { call_operation }.not_to change(Spell, :count) }
      }
    # rubocop:enable RSpec/RepeatedExample

    describe 'with a hash with valid attributes' do
      let(:attributes) do
        {
          name:         'Glowing Gaze',
          casting_time: '1 reaction, which you take when a creature within ' \
                        'range takes fire damage',
          duration:     'Instantaneous',
          level:        1,
          range:        '60 feet',
          school:       Spell::Schools::EVOCATION,
          description:  <<~DESCRIPTION
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
          .merge(attributes.stringify_keys)
          .merge(
            'id'         => a_uuid,
            'created_at' => an_instance_of(ActiveSupport::TimeWithZone),
            'updated_at' => an_instance_of(ActiveSupport::TimeWithZone)
          )
      end

      include_examples 'should resolve the polymorphic association',
        :origin,
        permitted_types: { not: 'Spell' }

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }

      it { expect(record.source).to be nil }

      it { expect(record.persisted?).to be true }

      it { expect { call_operation }.not_to change(Source, :count) }

      it { expect { call_operation }.to change(Spell, :count).by(1) }

      describe 'with a slug attribute' do
        let(:attributes) { super().merge(slug: 'custom-slug') }

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }
      end

      describe 'with a valid origin id and type' do
        let(:attributes) do
          super().merge(origin_id: origin_id, origin_type: origin_type)
        end
        let(:expected) do
          super().except('origin_id', 'origin_type')
        end

        before(:example) { origin.save! }

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it { expect(record.source).to be_a Source }

        it { expect(record.source.origin).to be == origin }

        it { expect(record.source.reference).to be == record }
      end

      describe 'with a valid origin' do
        let(:attributes) { super().merge(origin: origin) }
        let(:expected)   { super().except('origin') }

        before(:example) { origin.save! }

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }

        it { expect { call_operation }.to change(Source, :count).by(1) }

        it { expect(record.source).to be_a Source }

        it { expect(record.source.origin).to be == origin }

        it { expect(record.source.reference).to be == record }
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
