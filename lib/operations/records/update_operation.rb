# frozen_string_literal: true

require 'operations/records/assign_operation'
require 'operations/records/save_operation'

module Operations::Records
  # Initializes the given attributes to the given record, validates the record,
  # and persists it to the database.
  class UpdateOperation < Operations::Records::AssignOperation
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
