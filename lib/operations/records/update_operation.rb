# frozen_string_literal: true

require 'operations/records/assign_operation'
require 'operations/records/save_operation'

module Operations::Records
  # Initializes the given attributes to the given record, validates the record,
  # and persists it to the database.
  class UpdateOperation < Operations::Records::BaseOperation
    def initialize(record_class, assign_operation: nil, save_operation: nil)
      super(record_class)

      @assign_operation =
        assign_operation ||
        Operations::Records::AssignOperation.new(record_class)
      @save_operation =
        save_operation ||
        Operations::Records::SaveOperation.new(record_class)
    end

    private

    attr_reader :assign_operation

    attr_reader :save_operation

    def process(record, attributes)
      step assign_operation.call(record, attributes)

      save_operation.call(record)
    end
  end
end
