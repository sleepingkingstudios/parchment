# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to create a password from a non-String object.
  class InvalidPassword < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_password'

    def initialize
      super(message: 'Password must be a non-empty String')
    end
  end
end
