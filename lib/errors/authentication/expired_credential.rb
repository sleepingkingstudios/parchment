# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to serialize a session with an expired credential.
  class ExpiredCredential < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.expired_credential'

    def initialize
      super(message: 'Credential has expired')
    end
  end
end
