# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Initializes the given attributes to the given record.
  class AssignOperation < Operations::Records::BaseOperation
    private

    def process(record, attributes)
      return unless validate_attributes(attributes) && validate_record(record)

      handle_unknown_attribute do
        record.tap { record.assign_attributes(attributes) }
      end
    end
  end
end
