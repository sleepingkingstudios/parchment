# frozen_string_literal: true

require 'rspec/sleeping_king_studios/matchers/macros'

require 'support/matchers/be_a_result_matcher'

module RSpec::SleepingKingStudios::Matchers::Macros
  # @return [Spec::Support::MatchersBeAResultMatcher] a matcher for expecting
  #   a value to be a Cuprum::Result with status: failure.
  def be_a_failing_result
    Spec::Support::Matchers::BeAResultMatcher.new.with_failing_status
  end

  # @return [Spec::Support::MatchersBeAResultMatcher] a matcher for expecting
  #   a value to be a Cuprum::Result with status: success.
  def be_a_passing_result
    Spec::Support::Matchers::BeAResultMatcher.new.with_passing_status
  end

  # @return [Spec::Support::MatchersBeAResultMatcher] a matcher for expecting
  #   a value to be a Cuprum::Result.
  def be_a_result
    Spec::Support::Matchers::BeAResultMatcher.new
  end

  # @!method have_failing_result
  #   @see RSpec::SleepingKingStudios::Matchers::Core::BeAResultMatcher#matches?
  alias_matcher :have_failing_result, :be_a_failing_result

  # @!method have_passing_result
  #   @see RSpec::SleepingKingStudios::Matchers::Core::BeAResultMatcher#matches?
  alias_matcher :have_passing_result, :be_a_passing_result

  # @!method have_result
  #   @see RSpec::SleepingKingStudios::Matchers::Core::BeAResultMatcher#matches?
  alias_matcher :have_result, :be_a_result
end
