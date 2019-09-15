# frozen_string_literal: true

require 'operations/records/build_operation'
require 'operations/records/save_operation'

module Operations::Records
  # Initializes a new record for the given table from the given attributes,
  # validates the record, and persists it to the database.
  class CreateOperation < Operations::Records::BuildOperation
    def build_operation
      Operations::Records::BuildOperation.new(record_class)
    end

    def process(attributes = {})
      record = step build_operation.call(attributes)

      save_operation.call(record)
    end

    def save_operation
      Operations::Records::SaveOperation.new(record_class)
    end
  end
end
