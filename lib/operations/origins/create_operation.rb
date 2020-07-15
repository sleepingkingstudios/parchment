# frozen_string_literal: true

require 'operations/origins/build_operation'
require 'operations/records/create_operation'

module Operations::Origins
  # Initializes a new origin from the given attributes and persist the record to
  # the database.
  class CreateOperation < Operations::Records::CreateOperation
    def initialize(record_class, build_operation: nil)
      build_operation ||=
        Operations::Origins::BuildOperation.new(record_class)

      super(record_class, build_operation: build_operation)
    end
  end
end
