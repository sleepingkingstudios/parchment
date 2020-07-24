# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'
require 'rspec/sleeping_king_studios/matchers/base_matcher'

require 'operations/middleware'

require 'support/examples'
require 'support/matchers/be_applied_middleware_matcher'

module Spec::Support::Examples
  module OperationFactoryExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    # :nocov:
    def a_subclass_of(operation_class)
      an_instance_of(Class)
        .and(be < operation_class)
        .and(
          satisfy("have record_class: #{record_class}") do |actual|
            actual.record_class == record_class
          end
        )
    end
    # :nocov:

    def be_a_subclass_of(operation_class)
      be_instance_of(Class)
        .and(be < operation_class)
        .and(
          satisfy("have record_class: #{record_class}") do |actual|
            actual.record_class == record_class
          end
        )
    end

    # :nocov:
    def be_applied_middleware
      Spec::Support::Matchers::BeAppliedMiddlewareMatcher.new
    end
    # :nocov:

    shared_examples 'should define operation' do |method_name, expectation|
      constant_name = method_name.to_s.camelize

      describe "::#{constant_name}" do
        let(:operation_class) { factory.const_get(constant_name) }
        let(:operation)       { operation_class.new }
        let(:expectation)     { expectation }

        # :nocov:
        def match_expectation
          if expectation.is_a?(Proc)
            instance_exec(&expectation)
          elsif expectation.is_a?(Class)
            be <= expectation
          end
        end
        # :nocov:

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
