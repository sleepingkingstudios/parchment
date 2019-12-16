# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for records in the given table matching the specified
  # criteria.
  class FindMatchingOperation < Operations::Records::BaseOperation
    private

    def build_query(order:, where:)
      record_class
        .all
        .where(where)
        .order(order)
    end

    def default_order
      { created_at: :desc }
    end

    def process(order: nil, where: nil)
      order = default_order if order.blank?
      query = build_query(order: order, where: where)

      success(query.to_a)
    end
  end
end
