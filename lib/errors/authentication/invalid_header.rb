# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid authorization header.
  class InvalidHeader < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_header'

    def initialize(header:)
      super(message: "Invalid authorization header #{header.inspect}")

      @header = header
    end

    attr_reader :header

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => { 'header' => header },
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
