# frozen_string_literal: true

require 'rails_helper'

require 'operations/subclass'

require 'support/examples/operation_examples'

RSpec.describe Operations::Subclass do
  include Spec::Support::Examples::OperationExamples

  let(:described_class) { Spec::ParametersOperation }

  example_class 'Spec::ParametersOperation' do |klass|
    klass.extend(Operations::Subclass) # rubocop:disable RSpec/DescribedClass

    klass.define_method(:initialize) do |*args, **kwargs|
      @arguments = args
      @keywords  = kwargs
    end

    klass.attr_reader :arguments

    klass.attr_reader :keywords
  end

  describe '.applied_arguments' do
    include_examples 'should define class reader', :applied_arguments, []
  end

  describe '.applied_keywords' do
    include_examples 'should define class reader', :applied_keywords, {}
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
        applied_arguments + constructor_arguments
      end
      let(:expected_keywords) do
        applied_keywords.merge(constructor_keywords)
      end

      it 'should set the applied arguments' do
        expect(build_subclass.applied_arguments).to be == applied_arguments
      end

      it 'should set the applied keywords' do
        expect(build_subclass.applied_keywords).to be == applied_keywords
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

    let(:arguments)         { [] }
    let(:keywords)          { {} }
    let(:options)           { {} }
    let(:applied_arguments) { arguments }
    let(:applied_keywords)  { keywords }

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(0).arguments
        .and_keywords(:arguments, :as, :keywords)
    end

    def build_subclass(as: nil)
      described_class.subclass(as: as, **options)
    end

    include_examples 'should define a subclass'

    include_examples 'should merge the parameters'

    describe 'with arguments: nil' do
      let(:arguments)     { nil }
      let(:options)       { { arguments: arguments } }
      let(:error_message) { 'arguments must be an Array' }

      it 'should raise an error' do
        expect { build_subclass }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with arguments: an Object' do
      let(:arguments)     { Object.new.freeze }
      let(:options)       { { arguments: arguments } }
      let(:error_message) { 'arguments must be an Array' }

      it 'should raise an error' do
        expect { build_subclass }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with arguments: an empty array' do
      let(:arguments) { [] }
      let(:options)   { { arguments: arguments } }

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'
    end

    describe 'with arguments: an array with items' do
      let(:arguments) { %w[uno dos tres] }
      let(:options)   { { arguments: arguments } }

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'
    end

    describe 'with keywords: nil' do
      let(:keywords)      { nil }
      let(:options)       { { keywords: keywords } }
      let(:error_message) { 'keywords must be a Hash' }

      it 'should raise an error' do
        expect { build_subclass }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with keywords: an Object' do
      let(:keywords)      { Object.new.freeze }
      let(:options)       { { keywords: keywords } }
      let(:error_message) { 'keywords must be a Hash' }

      it 'should raise an error' do
        expect { build_subclass }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with keywords: an empty hash' do
      let(:keywords) { {} }
      let(:options)  { { keywords: keywords } }

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'
    end

    describe 'with keywords: a hash with values' do
      let(:keywords) do
        { color: 'indigo', shape: 'Klein bottle',  size: 'M' }
      end
      let(:options) { { keywords: keywords } }

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'
    end

    describe 'with arguments: an array and keywords: a hash' do
      let(:arguments) { %w[uno dos tres] }
      let(:keywords) do
        { color: 'indigo', shape: 'Klein bottle',  size: 'M' }
      end
      let(:options) { { arguments: arguments, keywords: keywords } }

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'
    end

    context 'when the base class is a subclass with applied parameters' do
      let(:described_class)      { Spec::AppliedOperation }
      let(:superclass_arguments) { %w[cero] }
      let(:superclass_keywords) do
        { color: 'infrared', decoration: 'rainbows', label: false }
      end
      let(:applied_arguments) do
        superclass_arguments + arguments
      end
      let(:applied_keywords) do
        superclass_keywords.merge(keywords)
      end

      example_constant 'Spec::AppliedOperation' do
        Spec::ParametersOperation
          .subclass(
            arguments: superclass_arguments,
            keywords:  superclass_keywords
          )
      end

      include_examples 'should define a subclass'

      include_examples 'should merge the parameters'

      describe 'with arguments: an array with items' do
        let(:arguments) { %w[uno dos tres] }
        let(:options)   { { arguments: arguments } }

        include_examples 'should define a subclass'

        include_examples 'should merge the parameters'
      end

      describe 'with keywords: a hash with values' do
        let(:keywords) do
          { color: 'indigo', shape: 'Klein bottle',  size: 'M' }
        end
        let(:options) { { keywords: keywords } }

        include_examples 'should define a subclass'

        include_examples 'should merge the parameters'
      end

      describe 'with arguments: an array and keywords: a hash' do
        let(:arguments) { %w[uno dos tres] }
        let(:keywords) do
          { color: 'indigo', shape: 'Klein bottle',  size: 'M' }
        end
        let(:options) { { arguments: arguments, keywords: keywords } }

        include_examples 'should define a subclass'

        include_examples 'should merge the parameters'
      end
    end
  end
end
