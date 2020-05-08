# frozen_string_literal: true

require 'bcrypt'

require 'errors/authentication/incorrect_password'
require 'errors/authentication/invalid_hash'
require 'errors/authentication/invalid_password'
require 'operations/authentication/password'

module Operations::Authentication::Password
  # Operation to check a password value against the encrypted credential.
  class Check < Cuprum::Command
    def initialize(credential)
      validate_credential(credential)

      @credential = credential
    end

    attr_reader :credential

    private

    def check_password(password)
      if BCrypt::Password.new(credential.encrypted_password) == password
        return success(credential)
      end

      failure(Errors::Authentication::IncorrectPassword.new)
    rescue BCrypt::Errors::InvalidHash
      failure(Errors::Authentication::InvalidHash.new)
    end

    def process(password)
      step { validate_password(password) }

      check_password(password)
    end

    def validate_credential(credential)
      return if credential.is_a?(Authentication::PasswordCredential)

      raise ArgumentError,
        'credential must be an Authentication::PasswordCredential'
    end

    def validate_password(password)
      return if password.is_a?(String) && !password.empty?

      failure(Errors::Authentication::InvalidPassword.new)
    end
  end
end
