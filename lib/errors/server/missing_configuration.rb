# frozen_string_literal: true

require 'errors/server/base'

module Errors::Server
  # Cuprum error for a missing server configuration.
  class MissingConfiguration < Errors::Server::Base
    # Short string used to identify the type of error.
    TYPE = 'server.missing_configuration'

    def initialize(message: nil)
      super(message: message || 'Server configuration invalid')
    end
  end
end
