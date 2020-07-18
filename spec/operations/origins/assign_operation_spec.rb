# frozen_string_literal: true

require 'rails_helper'

require 'operations/origins/assign_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Origins::AssignOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { {} }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { record_class.new }

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

    include_examples 'should handle unknown attributes',
      lambda {
        it { expect { call_operation }.not_to change(record, :attributes) }
      }

    describe 'with a hash with valid attributes' do
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

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end
      end

      describe 'with a non-empty slug' do
        let(:attributes) { super().merge('slug' => 'end-of-line') }

        it { expect(call_operation).to have_passing_result.with_value(record) }

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
