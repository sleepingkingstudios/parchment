# frozen_string_literal: true

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to serialize an expired session.
  class ExpiredSession < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.expired_session'

    def initialize
      super(message: 'Session has expired')
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
