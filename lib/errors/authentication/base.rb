# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Base class for Authentication errors.
  class Base < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.error'

    def initialize(message: nil)
      super(message: message || 'Unable to authenticate user or session')
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
