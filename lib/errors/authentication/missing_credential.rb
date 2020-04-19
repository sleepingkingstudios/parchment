# frozen_string_literal: true

require 'errors/authentication'

require 'cuprum/error'

module Errors::Authentication
  # Cuprum error when the credential for a session token is missing.
  class MissingCredential < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.missing_credential'

    def initialize(credential_id:)
      super(message: "Credential not found with id #{credential_id.inspect}")

      @credential_id = credential_id
    end

    attr_reader :credential_id

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => { 'credential_id' => credential_id },
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
