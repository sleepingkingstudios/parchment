# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid session input.
  class InvalidSession < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_session'

    def initialize
      super(message: 'Session must be an instance of Authorization::Session')
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
