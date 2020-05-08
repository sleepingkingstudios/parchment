# frozen_string_literal: true

require 'errors/authentication/failed_login'

module Errors::Authentication
  # Cuprum error for when credentials are not found for a username.
  class UserNotFound < Errors::Authentication::FailedLogin
    # Short string used to identify the type of error.
    TYPE = 'authentication.user_not_found'

    def initialize(username:)
      super(message: "User not found with username #{username.inspect}")

      @username = username
    end

    attr_reader :username

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      super.merge('data' => { 'username' => username })
    end
  end
end
