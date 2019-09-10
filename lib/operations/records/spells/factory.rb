# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/records/spells'
require 'operations/records/spells/find_matching_operation'

module Operations::Records::Spells
  # Command factory for generating Spell operations.
  class Factory < Operations::Records::Factory
    def self.instance
      @instance ||= new
    end

    def initialize
      super(Spell)
    end

    command :find_matching, Operations::Records::Spells::FindMatchingOperation
  end
end
