# frozen_string_literal: true

require 'jwt'

require 'errors/authentication/anonymous_session'
require 'errors/authentication/expired_credential'
require 'errors/authentication/expired_session'
require 'errors/authentication/inactive_credential'
require 'errors/authentication/invalid_session'
require 'errors/authentication/invalid_session_key'
require 'operations/authentication'

module Operations::Authentication
  # Operation to serialize an Authorization::Session as a JWT.
  class GenerateToken < Cuprum::Operation
    private

    def generate_payload(session)
      {
        exp: session.expires_at.to_i,
        iat: Time.current.to_i,
        sub: session.credential.id
      }
    end

    def generate_token(session, session_key)
      token = JWT.encode(generate_payload(session), session_key, 'HS256')

      success(token)
    end

    def process(session)
      step :validate_session, session

      session_key = step :validate_session_key

      generate_token(session, session_key)
    end

    def validate_credential_active(credential)
      return if credential.active?

      failure(Errors::Authentication::InactiveCredential.new)
    end

    def validate_credential_not_expired(credential)
      return unless credential.expired?

      failure(Errors::Authentication::ExpiredCredential.new)
    end

    def validate_session(session)
      unless session.is_a?(Authorization::Session)
        return failure(Errors::Authentication::InvalidSession.new)
      end

      step :validate_credential_active,      session.credential
      step :validate_credential_not_expired, session.credential
      step :validate_session_authenticated,  session
      step :validate_session_not_expired,    session
      step :validate_session_valid,          session
    end

    def validate_session_authenticated(session)
      return unless session.anonymous?

      failure(Errors::Authentication::AnonymousSession.new)
    end

    def validate_session_key
      session_key = ENV.fetch(
        'AUTHENTICATION_SESSION_KEY',
        Rails.application.credentials.authentication&.fetch(:session_key, nil)
      )

      return session_key unless session_key.blank?

      failure(Errors::Authentication::InvalidSessionKey.new)
    end

    def validate_session_not_expired(session)
      return unless session.expired?

      failure(Errors::Authentication::ExpiredSession.new)
    end

    def validate_session_valid(session)
      return if session.valid?

      failure(Cuprum::Error.new(message: 'Session is invalid'))
    end
  end
end
