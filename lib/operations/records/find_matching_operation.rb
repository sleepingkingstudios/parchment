# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for records in the given table matching the specified
  # criteria.
  class FindMatchingOperation < Operations::Records::BaseOperation
    private

    def default_order
      { created_at: :asc }
    end

    def order
      default_order
    end

    def process
      query.to_a
    end

    def query
      record_class
        .all
        .order(order)
    end
  end
end
