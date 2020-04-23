# frozen_string_literal: true

require 'errors/authentication/base'

module Errors::Authentication
  # Cuprum error when an operation is given an invalid authorization header.
  class InvalidHeader < Errors::Authentication::Base
    # Short string used to identify the type of error.
    TYPE = 'authentication.invalid_header'

    def initialize(header:)
      super(message: "Invalid authorization header #{header.inspect}")

      @header = header
    end

    attr_reader :header

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      super.merge('data' => { 'header' => header })
    end
  end
end
