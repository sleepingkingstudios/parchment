# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when an operation is missing a session token.
  class MissingToken < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.missing_token'

    def initialize
      super(message: "Authorization token can't be blank")
    end
  end
end
