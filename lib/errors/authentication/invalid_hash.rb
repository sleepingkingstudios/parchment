# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to parse an invalid password hash.
  class InvalidHash < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_hash'

    def initialize
      super(message: 'Password hash is invalid')
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
