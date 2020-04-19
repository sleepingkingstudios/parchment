# frozen_string_literal: true

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to decode a token with an invalid signature.
  class InvalidSignature < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_signature'

    def initialize
      super(message: 'Token signature is invalid')
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
