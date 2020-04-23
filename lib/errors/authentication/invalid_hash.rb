# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to parse an invalid password hash.
  class InvalidHash < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_hash'

    def initialize
      super(message: 'Password hash is invalid')
    end
  end
end
