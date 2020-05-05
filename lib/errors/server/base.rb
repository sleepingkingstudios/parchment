# frozen_string_literal: true

require 'errors/server'

module Errors::Server
  # Base class for Server errors.
  class Base < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'server.base'

    def initialize(message: nil)
      super(message: message || 'Server is unable to process request')
    end

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'message' => message,
        'type'    => type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      self.class::TYPE
    end
  end
end
