# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when a checked password does not match the encrypted value.
  class IncorrectPassword < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.incorrect_password'

    def initialize
      super(message: 'Password does not match')
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
