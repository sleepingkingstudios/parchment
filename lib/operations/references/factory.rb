# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/references/create_operation'
require 'operations/references/find_many_operation'
require 'operations/references/find_matching_operation'
require 'operations/references/find_one_operation'
require 'operations/references/update_operation'

module Operations::References
  # Command factory for generating record operations for references.
  class Factory < Operations::Records::Factory
    command_class(:create) do
      Operations::References::CreateOperation.subclass(record_class)
    end

    command_class(:find_many) do
      Operations::References::FindManyOperation.subclass(record_class)
    end

    command_class(:find_matching) do
      Operations::References::FindMatchingOperation.subclass(record_class)
    end

    command_class(:find_one) do
      Operations::References::FindOneOperation.subclass(record_class)
    end

    command_class(:update) do
      Operations::References::UpdateOperation.subclass(record_class)
    end
  end
end
