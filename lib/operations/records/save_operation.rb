# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Validates and persists a record to the database.
  class SaveOperation < Operations::Records::BaseOperation
    private

    def process(record)
      unless record.is_a?(record_class)
        result.errors = [['record', "must be a #{record_class.name}"]]

        return
      end

      return record if record.save

      result.errors = record_errors(record)

      record
    end
  end
end
