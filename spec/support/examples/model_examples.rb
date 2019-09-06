# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'
require 'support/examples/models/validation_examples'

module Spec::Support::Examples
  module ModelExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    def self.included(other)
      super

      other.include Spec::Support::Examples::Models::ValidationExamples
    end

    shared_examples 'should have attribute' \
      do |attr_name, default: nil, value: nil|
        attr_name = attr_name.intern

        include_examples 'should have property', attr_name

        context "when the attributes do not include #{attr_name}" do
          let(:attributes) do
            super().tap do |hsh|
              hsh.delete(attr_name.intern)
              hsh.delete(attr_name.to_s)
            end
          end

          it { expect(subject.send(attr_name)).to be == default }
        end

        context "when the attributes include #{attr_name}" do
          if value.nil?
            let(:expected) { attributes.fetch(attr_name.intern) }
          else
            let(:attributes) { super().merge(attr_name => value) }
            let(:expected)   { value }
          end

          it { expect(subject.public_send(attr_name)).to be == expected }
        end
      end
  end
end
