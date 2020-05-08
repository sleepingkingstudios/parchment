# frozen_string_literal: true

require 'bcrypt'

require 'errors/authentication/invalid_password'
require 'operations/authentication/password'

module Operations::Authentication::Password
  # Operation to generate an encrypted (hashed, salted) password.
  class Encrypt < Cuprum::Operation
    private

    def process(password)
      step { validate_password(password) }

      success(BCrypt::Password.create(password).to_s)
    end

    def validate_password(password)
      return if password.is_a?(String) && !password.empty?

      failure(Errors::Authentication::InvalidPassword.new)
    end
  end
end
