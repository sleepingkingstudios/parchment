# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid session token.
  class InvalidToken < Errors::Authentication::Base
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
  end
end
