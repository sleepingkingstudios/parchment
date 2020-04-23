# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when the credential for a session token is missing.
  class MissingCredential < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.missing_credential'

    def initialize(credential_id:)
      super(message: "Credential not found with id #{credential_id.inspect}")

      @credential_id = credential_id
    end

    attr_reader :credential_id

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      super.merge('data' => { 'credential_id' => credential_id })
    end
  end
end
