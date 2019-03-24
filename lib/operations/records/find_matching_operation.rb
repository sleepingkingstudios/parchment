# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for records in the given table matching the specified
  # criteria.
  class FindMatchingOperation < Operations::Records::BaseOperation
    private

    def process
      query.to_a
    end

    def query
      record_class.all
    end
  end
end
