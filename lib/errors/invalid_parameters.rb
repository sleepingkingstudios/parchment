# frozen_string_literal: true

require 'cuprum/error'

require 'errors'

module Errors
  # Cuprum error for invalid controller parameters.
  class InvalidParameters < Cuprum::Error
    # Format for generating error message.
    MESSAGE = 'invalid request parameters'

    # Short string used to identify the type of error.
    TYPE = 'invalid_parameters'

    # @param errors [Array] The specific error messages.
    def initialize(errors:)
      @errors = errors

      super(message: generate_message)
    end

    # @return [Array] the specific error messages.
    attr_reader :errors

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        data:    errors,
        message: message,
        type:    type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      TYPE
    end

    private

    def generate_message
      return MESSAGE if errors.empty?

      "#{MESSAGE}: #{errors.map { |ary| ary.join(' ') }.join(', ')}"
    end
  end
end
