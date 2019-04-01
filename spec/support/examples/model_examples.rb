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
      do |attr_name, default: nil|
        attr_name = attr_name.intern

        include_examples 'should have property',
          attr_name,
          -> { be == attributes.fetch(attr_name, default) }

        unless default.nil?
          context "when the #{attr_name} is not given" do
            let(:attributes) do
              super().tap do |hsh|
                hsh.delete(attr_name.intern)
                hsh.delete(attr_name.to_s)
              end
            end

            it { expect(subject.send(attr_name)).to be == default }
          end
        end
      end
  end
end
