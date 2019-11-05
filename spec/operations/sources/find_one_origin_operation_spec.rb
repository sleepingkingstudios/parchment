# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/find_one_origin_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Operations::Sources::FindOneOriginOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:operation) { described_class.new }

  describe '#initialize' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:origin)      { FactoryBot.build(:book) }
    let(:origin_id)   { origin.id }
    let(:origin_type) { 'Book' }

    def call_operation
      operation.call(origin_id: origin_id, origin_type: origin_type)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should validate the origin id'

    include_examples 'should validate the origin type'

    describe 'with an invalid foreign key' do
      let(:origin_id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { origin_id: origin_id },
          record_class: Book
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    context 'when there are many records' do
      let!(:records) do
        Array.new(3) { FactoryBot.create(:book) }
      end

      describe 'with an invalid foreign key' do
        let(:origin_id) { '00000000-0000-0000-0000-000000000000' }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { origin_id: origin_id },
            record_class: Book
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with a valid foreign key' do
        let(:origin) { records.first }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result.with_value(origin)
        end
      end
    end
  end
end
