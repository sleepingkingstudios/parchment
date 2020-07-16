# frozen_string_literal: true

require 'errors/failed_validation'
require 'fixtures/middleware'
require 'operations/authentication/password/encrypt'
require 'operations/middleware'

module Fixtures::Middleware
  # Fixture middleware for generating a password credential for a user.
  class SetPassword < Operations::Middleware
    private

    def create_credential(encrypted:, user:)
      credential = Authentication::PasswordCredential.new(
        expires_at:         1.year.from_now,
        encrypted_password: encrypted,
        user:               user
      )

      return credential if credential.save

      failure(Errors::FailedValidation.new(record: credential))
    end

    def destroy_credential(user:)
      credentials = Authentication::PasswordCredential.where(user: user)

      return success(true) if credentials.empty?

      credentials.destroy_all

      success(true)
    end

    def encrypt_password(password)
      Operations::Authentication::Password::Encrypt.new.call(password)
    end

    def fetch_password(attributes)
      attributes.fetch(:password, attributes.fetch('password', nil))
    end

    def non_persisted_record?(value)
      value.is_a?(ApplicationRecord) && !value.persisted?
    end

    def process(next_command, attributes)
      password = fetch_password(attributes)

      user     =
        step { super(next_command, attributes.except(:password, 'password')) }

      if user.is_a?(Hash) || non_persisted_record?(user) || password.blank?
        return success(user)
      end

      encrypted = step :encrypt_password, password

      step :destroy_credential, user: user
      step :create_credential,  encrypted: encrypted, user: user

      success(user)
    end
  end
end
