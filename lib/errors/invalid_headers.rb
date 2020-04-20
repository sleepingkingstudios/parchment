# frozen_string_literal: true

require 'cuprum/error'

require 'errors'

module Errors
  # Cuprum error for invalid request headers.
  class InvalidHeaders < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'invalid_headers'

    def initialize
      super(message: 'Invalid request headers')
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
      TYPE
    end
  end
end
