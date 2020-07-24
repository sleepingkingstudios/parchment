# frozen_string_literal: true

require 'spec_helper'

require 'rspec/sleeping_king_studios/examples/rspec_matcher_examples'

require 'support/matchers/be_applied_middleware_matcher'

RSpec.describe Spec::Support::Matchers::BeAppliedMiddlewareMatcher do
  include RSpec::SleepingKingStudios::Examples::RSpecMatcherExamples

  shared_context 'with expected command: a Class' do
    let(:expected_command) do
      defined?(super()) ? super() : Spec::CustomCommand
    end

    before(:example) do
      matcher.with_command(expected_command)
    end
  end

  shared_context 'with expected command: a matcher' do
    let(:expected_command) do
      defined?(super()) ? super() : be_a(Spec::CustomCommand)
    end

    before(:example) do
      matcher.with_command(expected_command)
    end
  end

  shared_context 'with expected middleware: one Class' do
    let(:expected_middleware) { Array.new(1, Spec::CustomCommand) }

    before(:example) do
      matcher.with_middleware(expected_middleware)
    end
  end

  shared_context 'with expected middleware: one matcher' do
    let(:expected_item) do
      defined?(super()) ? super() : be_a(Spec::CustomCommand)
    end
    let(:expected_middleware) { Array.new(1, expected_item) }

    before(:example) do
      matcher.with_middleware(expected_middleware)
    end
  end

  shared_context 'with expected middleware: many Classes' do
    let(:expected_middleware) { Array.new(3, Spec::CustomCommand) }

    before(:example) do
      matcher.with_middleware(expected_middleware)
    end
  end

  shared_context 'with expected middleware: many matchers' do
    let(:expected_item) do
      defined?(super()) ? super() : be_a(Spec::CustomCommand)
    end
    let(:expected_middleware) { Array.new(3, expected_item) }

    before(:example) do
      matcher.with_middleware(expected_middleware)
    end
  end

  subject(:matcher) { described_class.new }

  example_class 'Spec::CustomCommand', Cuprum::Command

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#description' do
    it { expect(matcher).to respond_to(:description).with(0).arguments }

    it { expect(matcher.description).to be == 'be applied middleware' }
  end

  describe '#expected_command' do
    include_examples 'should have reader', :expected_command, nil

    wrap_context 'with expected command: a Class' do
      it { expect(matcher.expected_command).to be expected_command }
    end

    wrap_context 'with expected command: a matcher' do
      it { expect(matcher.expected_command).to be expected_command }
    end
  end

  describe '#expected_middleware' do
    include_examples 'should have reader', :expected_middleware, []

    wrap_context 'with expected middleware: one Class' do
      it { expect(matcher.expected_middleware).to be == expected_middleware }
    end

    wrap_context 'with expected middleware: one matcher' do
      it { expect(matcher.expected_middleware).to be == expected_middleware }
    end

    wrap_context 'with expected middleware: many Classes' do
      it { expect(matcher.expected_middleware).to be == expected_middleware }
    end

    wrap_context 'with expected middleware: many matchers' do
      it { expect(matcher.expected_middleware).to be == expected_middleware }
    end
  end

  describe '#matches?' do
    shared_examples 'should match the expected command' do
      context 'when the command does not match the expected command' do
        let(:command) { non_matching_command }
        let(:failure_message) do
          "#{super()}\n  but the command does not match:#{command_message}"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the command matches the expected command' do
        let(:command) { matching_command }

        include_examples 'should pass with a positive expectation'
      end
    end

    shared_examples 'should match the expected middleware item' do
      context 'when the command does not have middleware' do
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n      expected 1 command, got 0 commands"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the command has too much middleware' do
        let(:middleware) { Array.new(3, matching_item) }
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n      expected 1 command, got 3 commands"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the middleware does not match the expected item' do
        let(:middleware) { Array.new(1, non_matching_item) }
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n  0:  #{inspect_middleware(middleware_message, 0)}"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the middleware matches the expected item' do
        let(:middleware) { Array.new(1, matching_item) }

        include_examples 'should pass with a positive expectation'
      end
    end

    shared_examples 'should match the expected middleware items' do
      context 'when the command does not have middleware' do
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n      expected 3 commands, got 0 commands"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the command does not have enough middleware' do
        let(:middleware) { Array.new(1, matching_item) }
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n      expected 3 commands, got 1 command"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the command has too much middleware' do
        let(:middleware) { Array.new(6, matching_item) }
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n      expected 3 commands, got 6 commands"
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the middleware does not match the expected items' do
        let(:middleware) { Array.new(3, non_matching_item) }
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n  0:  #{inspect_middleware(middleware_message, 0)}" \
          "\n  1:  #{inspect_middleware(middleware_message, 1)}" \
          "\n  2:  #{inspect_middleware(middleware_message, 2)}" \
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the middleware partially matches the expected items' do
        let(:middleware) do
          [
            non_matching_item,
            matching_item,
            non_matching_item
          ]
        end
        let(:failure_message) do
          "#{super()}\n  but the middleware does not match:" \
          "\n  0:  #{inspect_middleware(middleware_message, 0)}" \
          "\n  2:  #{inspect_middleware(middleware_message, 2)}" \
        end

        include_examples 'should fail with a positive expectation'
      end

      context 'when the middleware matches the expected items' do
        let(:middleware) { Array.new(3, matching_item) }

        include_examples 'should pass with a positive expectation'
      end
    end

    let(:failure_message) do
      "expected #{actual.inspect} to be applied middleware"
    end
    let(:failure_message_when_negated) do
      "expected #{actual.inspect} not to be applied middleware"
    end

    it { expect(matcher).to respond_to(:matches?).with(1).argument }

    def inspect_middleware(message, index)
      message.gsub(/%N/) { actual.middleware[index].inspect }
    end

    describe 'with nil' do
      let(:actual) { nil }

      include_examples 'should fail with a positive expectation'

      include_examples 'should pass with a negative expectation'
    end

    describe 'with an Object' do
      let(:actual) { Object.new }

      include_examples 'should fail with a positive expectation'

      include_examples 'should pass with a negative expectation'
    end

    describe 'with a Class' do
      let(:actual) { Object }

      include_examples 'should fail with a positive expectation'

      include_examples 'should pass with a negative expectation'
    end

    describe 'with a command Class' do
      let(:actual) { Class.new(Cuprum::Command) }

      include_examples 'should fail with a positive expectation'

      include_examples 'should pass with a negative expectation'
    end

    describe 'with a command' do
      let(:actual) { Cuprum::Command.new }

      include_examples 'should fail with a positive expectation'

      include_examples 'should pass with a negative expectation'
    end

    describe 'with an instance of AppliedMiddleware' do
      let(:command)    { Cuprum::Command.new }
      let(:middleware) { [] }
      let(:actual) do
        Class.new(Operations::AppliedMiddleware).new(
          command,
          middleware
        )
      end

      include_examples 'should pass with a positive expectation'

      include_examples 'should fail with a negative expectation'

      wrap_context 'with expected command: a Class' do
        let(:matching_command)     { Spec::CustomCommand.new }
        let(:non_matching_command) { Cuprum::Command.new }
        let(:command_message) do
          "\n    expected #{actual.command.inspect} to be a Spec::CustomCommand"
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_command()` is' \
              ' not supported'
        end

        include_examples 'should match the expected command'
      end

      wrap_context 'with expected command: a matcher' do
        let(:expected_command) do
          satisfy { |actual| actual.is_a?(Spec::CustomCommand) }
        end
        let(:matching_command)     { Spec::CustomCommand.new }
        let(:non_matching_command) { Cuprum::Command.new }
        let(:command_message) do
          "\n    expected #{actual.command.inspect} to satisfy expression" \
          ' `actual.is_a?(Spec::CustomCommand)`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_command()` is' \
              ' not supported'
        end

        include_examples 'should match the expected command'
      end

      wrap_context 'with expected middleware: one Class' do
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected %N to be a Spec::CustomCommand'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware item'
      end

      wrap_context 'with expected middleware: one matcher' do
        let(:expected_item) do
          satisfy { |actual| actual.is_a?(Spec::CustomCommand) }
        end
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected %N to satisfy expression' \
          ' `actual.is_a?(Spec::CustomCommand)`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware item'
      end

      wrap_context 'with expected middleware: many Classes' do
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected %N to be a Spec::CustomCommand'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware items'
      end

      wrap_context 'with expected middleware: many matchers' do
        let(:expected_item) do
          satisfy { |actual| actual.is_a?(Spec::CustomCommand) }
        end
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected %N to satisfy expression' \
          ' `actual.is_a?(Spec::CustomCommand)`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware items'
      end
    end

    describe 'with a subclass of AppliedMiddleware' do
      let(:command)    { Cuprum::Command }
      let(:middleware) { [] }
      let(:actual) do
        Operations::AppliedMiddleware.subclass(
          command,
          middleware
        )
      end

      include_examples 'should pass with a positive expectation'

      include_examples 'should fail with a negative expectation'

      wrap_context 'with expected command: a Class' do
        let(:matching_command)     { Spec::CustomCommand }
        let(:non_matching_command) { Cuprum::Command }
        let(:command_message) do
          "\n    expected: Spec::CustomCommand or a subclass" \
          "\n         got: #{actual.command.inspect}"
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_command()` is' \
              ' not supported'
        end

        include_examples 'should match the expected command'

        context 'when the command is an anonmyous class' do
          let(:matching_command)     { Class.new(Spec::CustomCommand) }
          let(:non_matching_command) { Class.new(Cuprum::Command) }
          let(:command_message) do
            "\n    expected: Spec::CustomCommand or a subclass" \
            "\n         got: #{actual.command.inspect} (Cuprum::Command)"
          end

          include_examples 'should match the expected command'
        end
      end

      wrap_context 'with expected command: a matcher' do
        let(:expected_command) do
          satisfy { |actual| actual <= Spec::CustomCommand }
        end
        let(:matching_command)     { Spec::CustomCommand }
        let(:non_matching_command) { Cuprum::Command }
        let(:command_message) do
          "\n    expected Cuprum::Command to satisfy expression `actual <=" \
          ' Spec::CustomCommand`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_command()` is' \
              ' not supported'
        end

        include_examples 'should match the expected command'
      end

      wrap_context 'with expected middleware: one Class' do
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected: Spec::CustomCommand or a subclass' \
          "\n           got: %N"
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware item'
      end

      wrap_context 'with expected middleware: one matcher' do
        let(:expected_item) do
          satisfy { |actual| actual <= Spec::CustomCommand }
        end
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected Cuprum::Command to satisfy expression' \
          ' `actual <= Spec::CustomCommand`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware item'
      end

      wrap_context 'with expected middleware: many Classes' do
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected: Spec::CustomCommand or a subclass' \
          "\n           got: %N"
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware items'
      end

      wrap_context 'with expected middleware: many matchers' do
        let(:expected_item) do
          satisfy { |actual| actual <= Spec::CustomCommand }
        end
        let(:matching_item)     { Spec::CustomCommand }
        let(:non_matching_item) { Cuprum::Command }
        let(:middleware_message) do
          'expected Cuprum::Command to satisfy expression' \
          ' `actual <= Spec::CustomCommand`'
        end

        it 'should raise an error when negated' do
          expect { matcher.does_not_match?(actual) }
            .to raise_error StandardError,
              '`expect().not_to be_applied_middleware().with_middleware()` is' \
              ' not supported'
        end

        include_examples 'should match the expected middleware items'
      end
    end
  end

  describe '#with_command' do
    let(:expected_command) { Cuprum::Command }

    it { expect(matcher).to respond_to(:with_command).with(1).argument }

    it { expect(matcher).to alias_method(:with_command).as(:and_command) }

    it { expect(matcher.with_command expected_command).to be matcher }

    describe 'with a Class' do
      let(:expected_command) { Cuprum::Command }

      it 'should set the expected command' do
        expect { matcher.with_command(expected_command) }
          .to change(matcher, :expected_command)
          .to be expected_command
      end
    end

    describe 'with a Proc' do
      let(:expected_command) { be_a Cuprum::Command }

      it 'should set the expected command' do
        expect { matcher.with_command(expected_command) }
          .to change(matcher, :expected_command)
          .to be expected_command
      end
    end
  end

  describe '#with_middleware' do
    let(:expected_middleware) { Array.new(1, Cuprum::Command) }

    it 'should define the method' do
      expect(matcher)
        .to respond_to(:with_middleware)
        .with(1).argument
        .and_unlimited_arguments
    end

    it { expect(matcher).to alias_method(:with_middleware).as(:and_middleware) }

    it { expect(matcher.with_middleware(*expected_middleware)).to be matcher }

    describe 'with expected middleware: one Class' do
      let(:expected_middleware) { Array.new(1, Cuprum::Command) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(*expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end

    describe 'with expected middleware: one matcher' do
      let(:expected_middleware) { Array.new(1, be_a(Cuprum::Command)) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(*expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end

    describe 'with expected middleware: many Classes' do
      let(:expected_middleware) { Array.new(3, Cuprum::Command) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(*expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end

    describe 'with expected middleware: many matchers' do
      let(:expected_middleware) { Array.new(3, be_a(Cuprum::Command)) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(*expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end

    describe 'with expected middleware: an empty Array' do
      let(:error_message) { "middleware can't be blank" }

      it 'should raise an error' do
        expect { matcher.with_middleware([]) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware: an array with one item' do
      let(:expected_middleware) { Array.new(1, Cuprum::Command) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end

    describe 'with middleware: an array with many items' do
      let(:expected_middleware) { Array.new(3, Cuprum::Command) }

      it 'should set the expected middleware' do
        expect { matcher.with_middleware(expected_middleware) }
          .to change(matcher, :expected_middleware)
          .to be == expected_middleware
      end
    end
  end
end
