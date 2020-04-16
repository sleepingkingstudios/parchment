# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to serialize an anonymous session.
  class AnonymousSession < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.anonymous_session'

    def initialize
      super(message: 'Session cannot be an anonymous Session')
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
