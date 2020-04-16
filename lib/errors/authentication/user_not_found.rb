# frozen_string_literal: true

require 'cuprum/error'

require 'errors/authentication'

module Errors::Authentication
  # Cuprum error for when credentials are not found for a username.
  class UserNotFound < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'authentication.user_not_found'

    def initialize(username:)
      super(message: "User not found with username #{username.inspect}")

      @username = username
    end

    attr_reader :username

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => { 'username' => username },
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
