# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/base_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::BaseOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '.subclass' do
    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(1).argument
        .and_keywords(:as)
    end

    def build_subclass(as: nil)
      described_class.subclass(record_class, as: as)
    end

    include_examples 'should define a subclass for the record class'
  end

  include_examples 'should define a #transaction method'

  describe '#call' do
    it { expect(operation).to respond_to(:call) }

    it 'should return a failing result' do
      expect(operation.call).to be_a_failing_result
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
