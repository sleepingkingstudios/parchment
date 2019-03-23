# frozen_string_literal: true

require 'operations/records'

module Operations::Records
  # Abstract base class for record operations.
  class BaseOperation < Cuprum::Operation
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
