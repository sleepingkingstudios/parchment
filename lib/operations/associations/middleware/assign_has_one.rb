# frozen_string_literal: true

require 'operations/associations/assign_has_one_operation'
require 'operations/associations/middleware'
require 'operations/middleware'
require 'operations/records/subclass'

module Operations::Associations::Middleware
  # Middleware to preload a has_one operation on a record or records.
  class AssignHasOne < Operations::Middleware
    extend Operations::Records::Subclass

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    # @param association_name [String, Symbol] The name of the association to
    #   assign.
    def initialize(record_class, association_name:)
      @association_name = association_name
      @record_class     = record_class
    end

    # @return [String, Symbol] The name of the association to assign.
    attr_reader :association_name

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    private

    def assign_association(records)
      operation = Operations::Associations::AssignHasOneOperation.new(
        record_class,
        association_name: association_name
      )

      operation.call(records)
    end

    def process(next_command, *args, **kwargs)
      records = super(next_command, *args, **kwargs)

      step :assign_association, records
    end
  end
end
