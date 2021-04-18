# frozen_string_literal: true

require 'errors/failed_validation'
require 'operations/records/base_operation'

module Operations::Records
  # Validates and persists a record to the database.
  class SaveOperation < Operations::Records::BaseOperation
    private

    def process(record)
      step { handle_invalid_record(record) }

      persist_record(record)
    end

    def persist_record(record)
      return record if record.save

      error = Errors::FailedValidation.new(record: record)

      failure(error)
    end
  end
end
