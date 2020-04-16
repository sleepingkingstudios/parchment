# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when trying to serialize a session with an inactive credential.
  class InactiveCredential < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.inactive_credential'

    def initialize
      super(message: 'Credential is not active')
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
