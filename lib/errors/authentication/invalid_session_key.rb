# frozen_string_literal: true

require 'cuprum/errors'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when attempting to serialize a session with an invalid secret.
  class InvalidSessionKey < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_session_key'

    def initialize
      super(message: 'Session key is invalid. See README.')
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
