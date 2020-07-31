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

    klass.define_method(:initialize) do |*args, **kwargs|
      @arguments    = args
      @keywords     = kwargs
    end

    klass.attr_reader :arguments

    klass.attr_reader :keywords

    klass.attr_reader :record_class
  end

  describe '.record_class' do
    let(:described_class) { Spec::ReadOperation }

    include_examples 'should define class reader', :record_class, nil

    wrap_context 'with an operation subclass' do
      it { expect(described_class.record_class).to be record_class }
    end
  end

  describe '.subclass' do
    shared_examples 'should merge the parameters' do
      subject(:operation) do
        if constructor_keywords.empty?
          build_subclass.new(*constructor_arguments)
        else
          build_subclass.new(*constructor_arguments, **constructor_keywords)
        end
      end

      let(:constructor_arguments) { [] }
      let(:constructor_keywords)  { {} }
      let(:expected_arguments) do
        [record_class, *arguments, *constructor_arguments]
      end
      let(:expected_keywords) do
        keywords.merge(constructor_keywords)
      end

      it { expect(operation.arguments).to be == expected_arguments }

      it { expect(operation.keywords).to be == expected_keywords }

      context 'with constructor arguments' do
        let(:constructor_arguments) { %w[cuatro cinco seis] }

        it { expect(operation.arguments).to be == expected_arguments }

        it { expect(operation.keywords).to be == expected_keywords }
      end

      context 'with constructor keywords' do
        let(:constructor_keywords) do
          { label: true, packaging: 'cardboard box', size: 'XL' }
        end

        it { expect(operation.arguments).to be == expected_arguments }

        it { expect(operation.keywords).to be == expected_keywords }
      end

      context 'with constructor arguments and keywords' do
        let(:constructor_arguments) { %w[cuatro cinco seis] }
        let(:constructor_keywords) do
          { label: true, packaging: 'cardboard box', size: 'XL' }
        end

        it { expect(operation.arguments).to be == expected_arguments }

        it { expect(operation.keywords).to be == expected_keywords }
      end
    end

    let(:described_class) { Spec::ReadOperation }
    let(:arguments)       { [] }
    let(:keywords)        { {} }
    let(:options)         { {} }
    let(:operation_name) do
      # rubocop:disable RSpec/DescribedClass
      Operations::Records::Subclass.subclass_name(described_class, record_class)
      # rubocop:enable RSpec/DescribedClass
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(1).argument
        .and_keywords(:arguments, :as, :keywords)
    end

    def build_subclass(as: nil)
      described_class.subclass(record_class, as: as, **options)
    end

    include_examples 'should define a subclass'

    include_examples 'should merge the parameters'
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
