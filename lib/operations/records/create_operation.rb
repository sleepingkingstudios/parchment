# frozen_string_literal: true

require 'operations/records/build_operation'
require 'operations/records/save_operation'

module Operations::Records
  # Initializes a new record for the given table from the given attributes,
  # validates the record, and persists it to the database.
  class CreateOperation < Operations::Records::BuildOperation
    def initialize(record_class)
      super

      chain!(save_operation, on: :success)
    end

    private

    def save_operation
      Operations::Records::SaveOperation.new(record_class)
    end
  end
end
