# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Validates and persists a record to the database.
  class SaveOperation < Operations::Records::BaseOperation
    private

    def process(record)
      handle_invalid_record(record) || persist_record(record)
    end

    def persist_record(record)
      return record if record.save

      failure(record_errors(record))
    end
  end
end
