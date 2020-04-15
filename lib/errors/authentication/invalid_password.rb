# frozen_string_literal: true

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to create a password from a non-String object.
  class InvalidPassword < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_password'

    def initialize
      super(message: 'Password must be a non-empty String')
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
