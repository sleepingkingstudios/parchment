# frozen_string_literal: true

require 'errors/server/missing_configuration'

module Errors::Server
  # Cuprum error for a missing session key.
  class MissingSessionKey < Errors::Server::MissingConfiguration
    # Short string used to identify the type of error.
    TYPE = 'server.missing_session_key'

    def initialize
      super(message: 'Session key is not configured or is empty')
    end
  end
end
