# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/subclass'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::Subclass do
  include Spec::Support::Examples::OperationExamples

  shared_context 'with an operation subclass' do
    let(:described_class) { Spec::ReadOperation.subclass(record_class) }
  end

  let(:record_class)    { Book }
  let(:operation_class) { Spec::ReadOperation }

  example_class 'Spec::ReadOperation' do |klass|
    # rubocop:disable RSpec/DescribedClass
    klass.extend(Operations::Records::Subclass)
    # rubocop:enable RSpec/DescribedClass

    klass.define_method(:initialize) do |record_class|
      @record_class = record_class
    end

    klass.attr_reader :record_class
  end

  describe '.inspect' do
    wrap_context 'with an operation subclass' do
      it { expect(described_class.inspect).to be == 'Spec::ReadBookOperation' }
    end
  end

  describe '.name' do
    wrap_context 'with an operation subclass' do
      it { expect(described_class.name).to be == 'Spec::ReadBookOperation' }
    end
  end

  describe '.record_class' do
    let(:described_class) { Spec::ReadOperation }

    include_examples 'should define class reader', :record_class, nil

    wrap_context 'with an operation subclass' do
      it { expect(described_class.record_class).to be record_class }
    end
  end

  describe '.subclass' do
    let(:described_class) { Spec::ReadOperation }

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(1).argument
        .and_keywords(:as)
    end

    def build_subclass(as: nil)
      described_class.subclass(record_class, as: as)
    end

    include_examples 'should define a subclass'
  end

  describe '.subclass_name' do
    it 'should define the class method' do
      expect(described_class).to respond_to(:subclass_name).with(2).arguments
    end

    context 'when the operation class name does not end in Operation' do
      let(:operation_class) { Spec::Read }

      example_class 'Spec::Read'

      it 'should generate the subclass name' do
        expect(described_class.subclass_name(operation_class, record_class))
          .to be == 'Spec::ReadBook'
      end
    end

    context 'when the operation class name ends in Operation' do
      it 'should generate the subclass name' do
        expect(described_class.subclass_name(operation_class, record_class))
          .to be == 'Spec::ReadBookOperation'
      end
    end
  end
end
