# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to decode a token with an invalid signature.
  class InvalidSignature < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_signature'

    def initialize
      super(message: 'Token signature is invalid')
    end
  end
end
