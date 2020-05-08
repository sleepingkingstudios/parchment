# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to serialize a session with an inactive credential.
  class InactiveCredential < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.inactive_credential'

    def initialize
      super(message: 'Credential is not active')
    end
  end
end
