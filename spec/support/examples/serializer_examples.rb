# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'

module Spec::Support::Examples
  module SerializerExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should serialize attributes' do |*attr_names|
      def generate_expected_hash_from_object(attr_names)
        attr_names.each.with_object({}) do |attr_name, hsh|
          hsh[attr_name.to_s] = object.send(attr_name)
        end
      end

      # rubocop:disable Metrics/MethodLength
      def generate_expected_hash(attr_names)
        unless attr_names.last.is_a?(Hash)
          return generate_expected_hash_from_object(attr_names)
        end

        values = generate_expected_hash_from_object(attr_names[0...-1])

        attr_names.last.each.with_object(values) do |(attr_name, expected), hsh|
          hsh[attr_name.to_s] =
            if expected.is_a?(Proc)
              instance_exec(&expected)
            else
              # :nocov:
              expected
              # :nocov:
            end
        end
      end
      # rubocop:enable Metrics/MethodLength

      let(:expected) do
        generate_expected_hash(attr_names)
      end

      it 'should serialize the attributes' do
        expect(subject.call object).to deep_match expected
      end
    end
  end
end
