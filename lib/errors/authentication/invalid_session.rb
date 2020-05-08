# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid session input.
  class InvalidSession < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_session'

    def initialize
      super(message: 'Session must be an instance of Authorization::Session')
    end
  end
end
