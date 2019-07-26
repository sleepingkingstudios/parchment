# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'

module Spec::Support::Examples
  module SerializerExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should serialize attributes' do |*attr_names|
      let(:expected) do
        attr_names.each.with_object({}) do |attr_name, hsh|
          hsh[attr_name.to_s] = object.send(attr_name)
        end
      end

      it 'should serialize the attributes' do
        expect(subject.serialize object).to deep_match expected
      end
    end
  end
end
