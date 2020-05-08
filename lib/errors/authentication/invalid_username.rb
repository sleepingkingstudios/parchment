# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid username input.
  class InvalidUsername < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_username'

    def initialize
      super(message: 'Username must be a non-empty String')
    end
  end
end
