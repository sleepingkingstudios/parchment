# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when a checked password does not match the encrypted value.
  class IncorrectPassword < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.incorrect_password'

    def initialize
      super(message: 'Password does not match')
    end
  end
end
