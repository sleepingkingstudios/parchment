# frozen_string_literal: true

require 'errors/authentication/invalid_password'
require 'errors/authentication/invalid_username'
require 'errors/authentication/user_not_found'

require 'operations/authentication/password/check'
require 'operations/authentication/strategies'

module Operations::Authentication::Strategies
  # Strategy for authenticating with a username and password.
  class Password < Cuprum::Operation
    EMAIL_ADDRESS_FORMAT = /[^@]+@[^@.]+\.[^@.]+/.freeze
    private_constant :EMAIL_ADDRESS_FORMAT

    private

    def check_password(credential:, password:, username:)
      result =
        Operations::Authentication::Password::Check
        .new(credential)
        .call(password)

      return result if result.success?

      failure(Errors::Authentication::UserNotFound.new(username: username))
    end

    def create_session(credential)
      Authorization::Session.new(
        credential: credential,
        expires_at: 1.day.from_now
      )
    end

    def credential_query(username:)
      user_attribute = email_address?(username) ? :email_address : :username

      Authentication::PasswordCredential
        .active
        .unexpired
        .joins(:user)
        .where(users: { user_attribute => username })
    end

    def email_address?(str)
      str.match?(EMAIL_ADDRESS_FORMAT)
    end

    def find_credential(username:)
      credential = credential_query(username: username).first

      return success(credential) if credential

      failure(Errors::Authentication::UserNotFound.new(username: username))
    end

    # rubocop:disable Metrics/MethodLength
    def process(password:, username:)
      step { validate_username(username) }
      step { validate_password(password) }

      credential = step { find_credential(username: username) }

      step do
        check_password(
          credential: credential,
          password:   password,
          username:   username
        )
      end

      create_session(credential)
    end
    # rubocop:enable Metrics/MethodLength

    def validate_password(password)
      return if password.is_a?(String) && !password.empty?

      failure(Errors::Authentication::InvalidPassword.new)
    end

    def validate_username(username)
      return if username.is_a?(String) && !username.empty?

      failure(Errors::Authentication::InvalidUsername.new)
    end
  end
end
