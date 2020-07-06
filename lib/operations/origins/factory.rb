# frozen_string_literal: true

require 'operations/origins/assign_operation'
require 'operations/origins/build_operation'
require 'operations/origins/create_operation'
require 'operations/origins/update_operation'

require 'operations/records/factory'

module Operations::Origins
  # Command factory for generating record operations for references.
  class Factory < Operations::Records::Factory
    command_class(:assign) do
      Operations::Origins::AssignOperation.subclass(record_class)
    end

    command_class(:build) do
      Operations::Origins::BuildOperation.subclass(record_class)
    end

    command_class(:create) do
      Operations::Origins::CreateOperation.subclass(record_class)
    end

    command_class(:update) do
      Operations::Origins::UpdateOperation.subclass(record_class)
    end
  end
end
