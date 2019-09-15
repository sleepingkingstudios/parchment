# frozen_string_literal: true

require 'cuprum/command_factory'

require 'operations/records'
require 'operations/records/assign_operation'
require 'operations/records/build_operation'
require 'operations/records/create_operation'
require 'operations/records/destroy_operation'
require 'operations/records/find_many_operation'
require 'operations/records/find_matching_operation'
require 'operations/records/find_one_operation'
require 'operations/records/save_operation'
require 'operations/records/update_operation'

module Operations::Records
  # Command factory for generating record operations.
  class Factory < Cuprum::CommandFactory
    def initialize(record_class)
      @record_class = record_class
    end

    attr_reader :record_class

    command_class(:assign) do
      Operations::Records::AssignOperation.subclass(record_class)
    end

    command_class(:build) do
      Operations::Records::BuildOperation.subclass(record_class)
    end

    command_class(:create) do
      Operations::Records::CreateOperation.subclass(record_class)
    end

    command_class(:destroy) do
      Operations::Records::DestroyOperation.subclass(record_class)
    end

    command_class(:find_many) do
      Operations::Records::FindManyOperation.subclass(record_class)
    end

    command_class(:find_matching) do
      Operations::Records::FindMatchingOperation.subclass(record_class)
    end

    command_class(:find_one) do
      Operations::Records::FindOneOperation.subclass(record_class)
    end

    command_class(:save) do
      Operations::Records::SaveOperation.subclass(record_class)
    end

    command_class(:update) do
      Operations::Records::UpdateOperation.subclass(record_class)
    end
  end
end
