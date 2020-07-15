# frozen_string_literal: true

require 'operations/origins/assign_operation'
require 'operations/records/update_operation'

module Operations::Origins
  # Assigns the given attributes to the given origin, validates the record,
  # and persists the record to the database.
  class UpdateOperation < Operations::Records::UpdateOperation
    def initialize(record_class, assign_operation: nil)
      assign_operation ||=
        Operations::Origins::AssignOperation.new(record_class)

      super(record_class, assign_operation: assign_operation)
    end
  end
end
