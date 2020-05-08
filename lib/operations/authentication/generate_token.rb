# frozen_string_literal: true

require 'jwt'

require 'errors/authentication/anonymous_session'
require 'errors/authentication/expired_credential'
require 'errors/authentication/expired_session'
require 'errors/authentication/inactive_credential'
require 'errors/authentication/invalid_session'
require 'operations/authentication'

module Operations::Authentication
  # Operation to serialize an Authorization::Session as a JWT.
  class GenerateToken < Cuprum::Operation
    def initialize(session_key:)
      validate_session_key(session_key)

      @session_key = session_key
    end

    private

    attr_reader :session_key

    def generate_payload(session)
      {
        exp: session.expires_at.to_i,
        iat: Time.current.to_i,
        sub: session.credential.id
      }
    end

    def generate_token(session)
      token = JWT.encode(generate_payload(session), session_key, 'HS256')

      success(token)
    end

    def process(session)
      step :validate_session, session

      generate_token(session)
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

    def validate_session_key(session_key)
      raise ArgumentError, "Session key can't be blank" if session_key.nil?

      unless session_key.is_a?(String)
        raise ArgumentError, 'Session key must be a String'
      end

      raise ArgumentError, "Session key can't be blank" if session_key.empty?
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
