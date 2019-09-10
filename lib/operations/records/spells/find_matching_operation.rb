# frozen_string_literal: true

require 'operations/records/find_matching_operation'
require 'operations/records/spells'

module Operations::Records::Spells
  # Queries the database for Spells matching the specified criteria.
  class FindMatchingOperation < Operations::Records::FindMatchingOperation
    def initialize
      super(Spell)
    end

    private

    def default_order
      { name: :asc }
    end
  end
end
