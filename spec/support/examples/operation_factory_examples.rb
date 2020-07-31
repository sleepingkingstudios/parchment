# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'
require 'rspec/sleeping_king_studios/matchers/base_matcher'

require 'operations/middleware'

require 'support/examples'
require 'support/matchers/be_applied_middleware_matcher'

module Spec::Support::Examples
  module OperationFactoryExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    # rubocop:disable Metrics/MethodLength
    # rubocop:disable Style/MultilineBlockChain
    def a_subclass_of(operation_class, **properties)
      if operation_class.is_a?(::Operations::Records::Subclass)
        properties = properties.merge(record_class: record_class)
      end

      base_matcher = an_instance_of(Class).and(be < operation_class)
      properties
        .map do |property, value|
          satisfy("have #{property}: #{value}") do |actual|
            actual.new.send(property) == value
          end
        end
        .reduce(base_matcher) do |composed, matcher|
          composed.and(matcher)
        end
    end

    def be_a_subclass_of(operation_class, **properties)
      if operation_class.is_a?(::Operations::Records::Subclass)
        properties = properties.merge(record_class: record_class)
      end

      base_matcher = be_instance_of(Class).and(be < operation_class)
      properties
        .map do |property, value|
          satisfy("have #{property}: #{value}") do |actual|
            actual.new.send(property) == value
          end
        end
        .reduce(base_matcher) do |composed, matcher|
          composed.and(matcher)
        end
    end
    # rubocop:enable Metrics/MethodLength
    # rubocop:enable Style/MultilineBlockChain

    def be_applied_middleware
      Spec::Support::Matchers::BeAppliedMiddlewareMatcher.new
    end

    shared_examples 'should define operation' do |method_name, expectation|
      constant_name = method_name.to_s.camelize

      describe "::#{constant_name}" do
        let(:operation_class) { factory.const_get(constant_name) }
        let(:operation)       { operation_class.new }
        let(:expectation)     { expectation }

        def match_expectation
          # :nocov:
          if expectation.is_a?(Proc)
            instance_exec(&expectation)
          elsif expectation.is_a?(Class)
            be <= expectation
          end
          # :nocov:
        end

        it { expect(factory).to define_constant(constant_name) }

        it { expect(operation_class).to be_a Class }

        it { expect(operation_class).to match_expectation }

        it { expect(operation_class).to be_constructible.with(0).arguments }
      end

      describe "##{method_name}" do
        let(:operation_class) { factory.const_get(constant_name) }
        let(:operation)       { factory.public_send(method_name) }

        it { expect(factory).to respond_to(method_name).with(0).arguments }

        it { expect(operation).to be_a operation_class }
      end
    end
  end
end
