# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid session token.
  class InvalidToken < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_token'

    def initialize(token:)
      super(message: "Invalid authorization token #{token.inspect}")

      @token = token
    end

    attr_reader :token

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => { 'token' => token },
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
