# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when an operation is missing a session token.
  class MissingToken < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.missing_token'

    def initialize
      super(message: "Authorization token can't be blank")
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
