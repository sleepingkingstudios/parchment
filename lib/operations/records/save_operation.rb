# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Validates and persists a record to the database.
  class SaveOperation < Operations::Records::BaseOperation
    private

    def process(record)
      return unless validate_record(record)

      return record if record.save

      result.errors = record_errors(record)

      record
    end
  end
end
