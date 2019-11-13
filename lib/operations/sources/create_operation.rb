# frozen_string_literal: true

require 'operations/records/create_operation'
require 'operations/sources/build_operation'

module Operations::Sources
  # Initializes a new source from the given attributes, origin, and reference,
  # validates the source, and persists it to the database.
  class CreateOperation < Operations::Records::CreateOperation
    def initialize(build_operation: nil, save_operation: nil)
      build_operation ||= Operations::Sources::BuildOperation.new

      super(
        Source,
        build_operation: build_operation,
        save_operation:  save_operation
      )
    end
  end
end
