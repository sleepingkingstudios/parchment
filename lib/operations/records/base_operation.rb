# frozen_string_literal: true

require 'operations/records'
require 'operations/records/parameter_validations'
require 'operations/records/subclass'
require 'operations/transaction'

module Operations::Records
  # Abstract base class for record operations.
  class BaseOperation < Cuprum::Operation
    extend  Operations::Records::Subclass
    include Operations::Records::ParameterValidations
    include Operations::Transaction

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize(record_class)
      @record_class = record_class
    end

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class
  end
end
