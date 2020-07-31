# frozen_string_literal: true

require 'rspec/sleeping_king_studios/matchers/base_matcher'

require 'operations/applied_middleware'

require 'support/matchers'

module Spec::Support::Matchers
  # rubocop:disable Metrics/ClassLength
  class BeAppliedMiddlewareMatcher < \
        RSpec::SleepingKingStudios::Matchers::BaseMatcher
    def initialize
      super

      @expected_middleware = []
    end

    attr_reader :actual

    attr_reader :expected_command

    attr_reader :expected_middleware

    def does_not_match?(actual) # rubocop:disable Metrics/MethodLength
      if expected_command?
        raise StandardError,
          '`expect().not_to be_applied_middleware().with_command()` is not' \
          ' supported'
      end

      if expected_middleware?
        raise StandardError,
          '`expect().not_to be_applied_middleware().with_middleware()` is not' \
          ' supported'
      end

      !matches?(actual)
    end

    def failure_message
      str =
        +"expected #{actual_description} to be applied middleware"

      return str unless applied_middleware?

      str << command_failure_message unless command_matches?

      str << middleware_failure_message unless middleware_matches?

      str
    end

    def failure_message_when_negated
      "expected #{actual_description} not to be applied middleware"
    end

    def matches?(actual)
      @actual             = actual
      @command_matches    = nil
      @middleware_matches = nil

      applied_middleware? && command_matches? && middleware_matches?
    end

    def with_command(expected_command)
      @expected_command = expected_command

      self
    end
    alias_method :and_command, :with_command

    def with_middleware(first, *rest)
      @expected_middleware = Array(first).concat(rest)

      if @expected_middleware.empty?
        raise ArgumentError, "middleware can't be blank"
      end

      self
    end
    alias_method :and_middleware, :with_middleware

    private

    def actual_description
      return actual.inspect unless actual.is_a?(Class)

      actual.name || actual.inspect
    end

    def applied_middleware?
      if actual.is_a?(Class)
        # Module.:<= returns nil if there is no relationship.
        actual <= ::Operations::AppliedMiddleware || false
      else
        actual.is_a?(Operations::AppliedMiddleware)
      end
    end

    def command_failure_message
      "\n  but the command does not match:" \
      "\n#{tools.str.indent(@command_failure, 4)}"
    end

    def command_matches?
      return @command_matches unless @command_matches.nil?

      return @command_matches = true unless expected_command?

      matcher = match_expectation(expected_command)

      return true if matcher.matches?(actual.command)

      @command_failure = failure_message_for(matcher)

      false
    end

    def expected_command?
      !@expected_command.nil?
    end

    def expected_middleware?
      !(@expected_middleware.nil? || @expected_middleware.empty?)
    end

    def failure_message_for(matcher) # rubocop:disable Metrics/AbcSize
      unless matcher.is_a?(RSpec::Matchers::BuiltIn::BeComparedTo)
        return matcher.failure_message
      end

      message = +"expected: #{matcher.expected} or a subclass"

      message << "\n     got: #{inspect_class(actual.command)}"

      return message if actual.command.name

      message << " (#{actual.command.ancestors.map(&:name).find(&:itself)})"
    end

    def inspect_class(klass)
      klass.name || klass.inspect
    end

    def match_expectation(expectation)
      return expectation if expectation.respond_to?(:matches?)

      if actual.is_a?(Class)
        RSpec::Matchers::BuiltIn::BeComparedTo.new(expectation, :<=)
      else
        RSpec::SleepingKingStudios::Matchers::BuiltIn::BeAKindOfMatcher
          .new(expectation)
      end
    end

    def middleware_count_failure_message
      "\n      expected" \
      " #{pluralize expected_middleware.size, 'command'}" \
      ", got #{pluralize actual.middleware.size, 'command'}"
    end

    def middleware_count_matches?
      return true if @expected_middleware.nil?

      actual.middleware.size == expected_middleware.size
    end

    def middleware_items_match?
      @middleware_item_failures =
        expected_middleware.map.with_index do |expected, index|
          matcher = match_expectation(expected)

          next if matcher.matches?(actual.middleware[index])

          failure_message_for(matcher)
        end

      @middleware_item_failures.all?(&:nil?)
    end

    def middleware_failure_message
      str = +"\n  but the middleware does not match:"

      unless middleware_count_matches?
        return str << middleware_count_failure_message
      end

      (@middleware_item_failures || []).each.with_index do |message, index|
        next if message.nil?

        str << "\n  #{"#{index}:".ljust(4)}"
        str << tools.str.indent(message, 6).lstrip
      end

      str
    end

    def middleware_matches?
      return @middleware_matches unless @middleware_matches.nil?

      return @middleware_matches = true unless expected_middleware?

      @middleware_matches = middleware_count_matches? && middleware_items_match?
    end

    def pluralize(count, singular, plural = nil)
      "#{count} #{tools.int.pluralize count, singular, plural}"
    end

    def tools
      SleepingKingStudios::Tools::Toolbelt.instance
    end
  end
  # rubocop:enable Metrics/ClassLength
end
