# frozen_string_literal: true

require 'rails_helper'

require 'operations/attributes/generate_slug'
require 'operations/origins/create_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Origins::CreateOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { {} }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { call_operation.value }
    let(:invalid_attributes) do
      {
        title:            '',
        publication_date: nil,
        publisher_name:   ''
      }
    end
    let(:expected_validation_error) do
      operation          = Operations::Attributes::GenerateSlug.new
      invalid_attributes =
        attributes.merge(slug: operation.call(attributes[:title]).value)
      invalid_record     = record_class.new(invalid_attributes)

      Errors::FailedValidation.new(record: invalid_record.tap(&:valid?))
    end

    def call_operation
      operation.call(attributes: attributes)
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes)
    end

    include_examples 'should validate the attributes'

    # rubocop:disable RSpec/RepeatedExample
    include_examples 'should handle invalid attributes',
      lambda {
        it { expect { call_operation }.not_to change(Book, :count) }
      }

    include_examples 'should handle unknown attributes',
      lambda {
        it { expect { call_operation }.not_to change(Book, :count) }
      }
    # rubocop:enable RSpec/RepeatedExample

    describe 'with a hash with valid attributes' do
      let(:attributes) do
        {
          title:            'Greetings, programs!',
          publication_date: Date.new(1982, 7, 9),
          publisher_name:   'Master Control Program'
        }
      end
      let(:expected) do
        super()
          .merge(
            'abbreviation' => 'gp',
            'slug'         => 'greetings-programs'
          )
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

      it { expect { call_operation }.to change(Book, :count).by(1) }

      describe 'with an empty slug attribute' do
        let(:attributes) { super().merge(slug: '') }
        let(:expected)   { super().merge('slug' => 'greetings-programs') }

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }
      end

      describe 'with a non-empty slug attribute' do
        let(:attributes) { super().merge(slug: 'custom-slug') }

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
