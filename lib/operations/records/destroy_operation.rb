# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Removes a record from the database.
  class DestroyOperation < Operations::Records::BaseOperation
    private

    def process(record)
      return unless validate_record(record)

      record.tap(&:destroy)
    end
  end
end
