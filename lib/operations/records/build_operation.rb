# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Initializes a new record for the given table from the given attributes.
  class BuildOperation < Operations::Records::BaseOperation
    private

    def process(attributes = {})
      return unless validate_attributes(attributes)

      handle_unknown_attribute { record_class.new(attributes) }
    end
  end
end
