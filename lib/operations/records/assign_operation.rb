# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Updates the given record with the given attributes.
  class AssignOperation < Operations::Records::BaseOperation
    private

    def process(attributes: {}, record:)
      step :handle_invalid_attributes, attributes
      step :handle_invalid_record,     record

      handle_unknown_attribute do
        record.tap { record.assign_attributes(attributes) }
      end
    end
  end
end
