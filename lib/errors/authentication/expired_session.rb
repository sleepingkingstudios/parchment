# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when trying to serialize an expired session.
  class ExpiredSession < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.expired_session'

    def initialize
      super(message: 'Session has expired')
    end
  end
end
