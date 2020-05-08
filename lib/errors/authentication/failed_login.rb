# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Base class for Authentication errors for a failed login.
  class FailedLogin < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.failed_login'

    def initialize(message: nil)
      super(message: message || 'Unable to log in with the given credentials')
    end
  end
end
