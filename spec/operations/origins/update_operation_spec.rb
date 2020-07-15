# frozen_string_literal: true

require 'rails_helper'

require 'operations/attributes/generate_slug'
require 'operations/origins/update_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Origins::UpdateOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes)  { {} }
    let(:expected)    { record.attributes }
    let(:record)      { FactoryBot.build(:book) }
    let(:invalid_attributes) do
      {
        title:            'End of Line',
        publication_date: nil,
        publisher_name:   ''
      }
    end
    let(:expected_validation_error) do
      operation          = Operations::Attributes::GenerateSlug.new
      invalid_attributes = attributes.merge(
        abbreviation: Models::Naming.generate_abbreviation(attributes[:title]),
        slug:         operation.call(attributes[:title]).value
      )
      invalid_record = record_class.new(invalid_attributes)

      Errors::FailedValidation.new(record: invalid_record.tap(&:valid?))
    end

    def call_operation
      operation.call(record, attributes)
    end

    it { expect(operation).to respond_to(:call).with(2).arguments }

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
          'title'            => 'Greetings, programs!',
          'publication_date' => Date.new(1982, 7, 9),
          'publisher_name'   => 'Master Control Program'
        }
      end
      let(:expected) do
        super()
          .merge('slug' => 'greetings-programs')
          .merge(attributes)
          .except('updated_at')
      end

      before(:example) do
        record.save!

        expected
      end

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it 'should update the attributes' do
        expect { call_operation }
          .to change(record, :attributes)
          .to be >= expected
      end

      describe 'with an empty slug' do
        let(:attributes) { super().merge('slug' => '') }
        let(:expected)   { super().merge('slug' => 'greetings-programs') }

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
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
