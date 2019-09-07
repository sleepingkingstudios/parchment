# frozen_string_literal: true

require 'operations/steps'

RSpec.describe Operations::Steps do
  let(:described_class) { Spec::Operation }
  let(:operation)       { described_class.new }

  example_class 'Spec::Operation', Cuprum::Operation do |klass|
    klass.include Operations::Steps # rubocop:disable RSpec/DescribedClass

    klass.define_method(:do_something) { |*_args| }
  end

  describe '#call' do
    let(:result) { operation.call.to_cuprum_result }

    context 'when the implementation has a failing step' do
      let(:error) { Cuprum::Error.new(message: 'Something went wrong.') }

      before(:example) do
        class Spec::Operation
          private

          def process
            step(failure Cuprum::Error.new(message: 'Something went wrong.'))
          end
        end
      end

      it 'should return a result with the failing value' do
        operation.call

        expect(result).to be_a_failing_result.with_error(be == error)
      end
    end

    context 'when the implementation has a passing step' do
      before(:example) do
        class Spec::Operation
          private

          def process
            step(success 'result value')
          end
        end
      end

      it 'should return a result with the passing value' do
        operation.call

        expect(result).to be_a_passing_result.with_value(be == 'result value')
      end
    end

    context 'when the implementation has multiple steps' do
      let(:described_class) { Spec::MathOperation }

      example_class 'Spec::DivideOperation', Cuprum::Operation do |klass|
        klass.define_method(:process) do |dividend, divisor|
          if divisor.zero?
            return failure(Cuprum::Error.new(message: 'Cannot divide by zero.'))
          end

          success(dividend / divisor)
        end
      end

      example_class 'Spec::MathOperation', Cuprum::Operation do |klass|
        klass.include Operations::Steps # rubocop:disable RSpec/DescribedClass

        klass.define_method(:add) { |*values| values.reduce(&:+) }

        klass.define_method(:divide) do |dividend, divisor|
          Spec::DivideOperation.new.call(dividend, divisor)
        end

        klass.define_method(:exponent) { |base, power| base**power }

        klass.define_method(:multiply) { |*values| values.reduce(&:*) }

        klass.define_method(:process) do |value, addend, factor, divisor, power|
          value = step :add,      value, addend
          value = step :multiply, value, factor
          value = step :divide,   value, divisor

          step :exponent, value, power
        end
      end

      before(:example) do
        %i[add divide exponent multiply].each do |method_name|
          allow(operation).to receive(method_name).and_call_original
        end
      end

      describe 'with invalid parameters' do
        let(:value)   { 3 }
        let(:addend)  { 3 }
        let(:factor)  { 5 }
        let(:divisor) { 0 }
        let(:power)   { 2 }
        let(:expected_error) do
          Cuprum::Error.new(message: 'Cannot divide by zero.')
        end

        # rubocop:disable RSpec/MultipleExpectations
        it 'should perform each step up to the first failure' do
          operation.call(value, addend, factor, divisor, power)

          expect(operation).to have_received(:add).with(value, addend).ordered
          expect(operation).to have_received(:multiply).with(6, factor).ordered
          expect(operation).to have_received(:divide).with(30, divisor).ordered
          expect(operation).not_to have_received(:exponent)
        end
        # rubocop:enable RSpec/MultipleExpectations

        it 'should return the first failing result' do
          result = operation.call(value, addend, factor, divisor, power)

          expect(result).to be_a_failing_result.with_error(expected_error)
        end
      end

      describe 'with valid parameters' do
        let(:value)   { 3 }
        let(:addend)  { 3 }
        let(:factor)  { 5 }
        let(:divisor) { 2 }
        let(:power)   { 2 }

        # rubocop:disable RSpec/MultipleExpectations
        it 'should perform each step in sequence' do
          operation.call(value, addend, factor, divisor, power)

          expect(operation).to have_received(:add).with(value, addend).ordered
          expect(operation).to have_received(:multiply).with(6, factor).ordered
          expect(operation).to have_received(:divide).with(30, divisor).ordered
          expect(operation).to have_received(:exponent).with(15, power).ordered
        end
        # rubocop:enable RSpec/MultipleExpectations

        it 'should return a result with the passing value' do
          result = operation.call(value, addend, factor, divisor, power)

          expect(result).to be_a_passing_result.with_value(225)
        end
      end
    end
  end

  describe '#step' do
    it 'should define the private method' do
      expect(operation)
        .to respond_to(:step, true)
        .with(1).argument
        .and_unlimited_arguments
    end

    describe 'with nil' do
      let(:error_message) do
        'expected parameter to be a result, an operation, or a method name,' \
        ' but was nil'
      end

      it 'should raise an error' do
        expect { operation.send(:step, nil) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with a value' do
      let(:value) { Object.new.freeze }
      let(:error_message) do
        'expected parameter to be a result, an operation, or a method name,' \
        " but was #{value.inspect}"
      end

      it 'should raise an error' do
        expect { operation.send(:step, value) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with the name of an undefined method' do
      it 'should raise an error' do
        expect { operation.send(:step, :do_nothing) }
          .to raise_error NoMethodError
      end
    end

    describe 'with the name of a method that returns a non-result value' do
      let(:value) { 'returned value' }

      before(:example) do
        allow(operation).to receive(:do_something).and_return(value)
      end

      it 'should call the method' do
        operation.send(:step, :do_something)

        expect(operation).to have_received(:do_something).with(no_args)
      end

      it 'should return the result value' do
        expect(operation.send(:step, :do_something)).to be value
      end
    end

    describe 'with the name of a method that returns a failing result' do
      let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
      let(:result) { Cuprum::Result.new(error: error) }

      before(:example) do
        allow(operation).to receive(:do_something).and_return(result)
      end

      it 'should call the method' do
        catch(:cuprum_failed_step) { operation.send(:step, :do_something) }

        expect(operation).to have_received(:do_something).with(no_args)
      end

      it 'should throw :cuprum_failed_step and the failing result' do
        expect { operation.send(:step, :do_something) }
          .to throw_symbol(:cuprum_failed_step, result)
      end
    end

    describe 'with the name of a method that returns a passing result' do
      let(:value)  { 'result value' }
      let(:result) { Cuprum::Result.new(value: value) }

      before(:example) do
        allow(operation).to receive(:do_something).and_return(result)
      end

      it 'should call the method' do
        operation.send(:step, :do_something)

        expect(operation).to have_received(:do_something).with(no_args)
      end

      it 'should return the result value' do
        expect(operation.send(:step, :do_something)).to be value
      end
    end

    describe 'with the name of a method that takes arguments' do
      let(:arguments) { %w[ichi ni san] }
      let(:value)     { 'result value' }
      let(:result)    { Cuprum::Result.new(value: value) }

      before(:example) do
        allow(operation).to receive(:do_something).and_return(result)
      end

      it 'should call the method' do
        operation.send(:step, :do_something, *arguments)

        expect(operation).to have_received(:do_something).with(*arguments)
      end

      it 'should return the result value' do
        expect(operation.send(:step, :do_something)).to be value
      end
    end

    describe 'with an uncalled operation' do
      let(:other)  { Cuprum::Operation.new }
      let(:result) { other.to_cuprum_result }

      it 'should throw :cuprum_failed_step and the failing result' do
        expect { operation.send(:step, other) }
          .to throw_symbol(:cuprum_failed_step, result)
      end
    end

    describe 'with a called operation with a failing result' do
      let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
      let(:result) { Cuprum::Result.new(error: error) }
      let(:other) do
        returned_result = result

        Cuprum::Operation.new { returned_result }.call
      end

      it 'should throw :cuprum_failed_step and the failing result' do
        expect { operation.send(:step, other) }
          .to throw_symbol(:cuprum_failed_step, result)
      end
    end

    describe 'with a called operation with a passing result' do
      let(:value)  { 'result value' }
      let(:result) { Cuprum::Result.new(value: value) }
      let(:other) do
        returned_result = result

        Cuprum::Operation.new { returned_result }.call
      end

      it 'should return the result value' do
        expect(operation.send(:step, other)).to be value
      end
    end

    describe 'with a failing result' do
      let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
      let(:result) { Cuprum::Result.new(error: error) }

      it 'should throw :cuprum_failed_step and the failing result' do
        expect { operation.send(:step, result) }
          .to throw_symbol(:cuprum_failed_step, result)
      end
    end

    describe 'with a passing result' do
      let(:value)  { 'result value' }
      let(:result) { Cuprum::Result.new(value: value) }

      it 'should return the result value' do
        expect(operation.send(:step, result)).to be value
      end
    end
  end
end
