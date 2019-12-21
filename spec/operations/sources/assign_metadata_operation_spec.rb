# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/assign_metadata_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Operations::Sources::AssignMetadataOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:operation) { described_class.new }

  let(:record_class) { Source }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:origin) { nil }
    let(:record) { record_class.new(origin: origin) }
    let(:source) { record }

    def call_operation
      operation.call(source)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should validate the origin'

    include_examples 'should validate the record'

    include_examples 'should update the source metadata'

    describe 'when the origin is a Book' do
      let(:book)   { FactoryBot.build(:book) }
      let(:origin) { book }

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(source)
      end
    end
  end
end
