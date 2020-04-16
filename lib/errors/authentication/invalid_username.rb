# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid username input.
  class InvalidUsername < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_username'

    def initialize
      super(message: 'Username must be a non-empty String')
    end

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'message' => message,
        'type'    => type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      TYPE
    end
  end
end
