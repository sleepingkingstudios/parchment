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

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(record, attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

      step { assign_operation.call(record, attributes) }

      save_operation.call(record)
    end
  end
end
