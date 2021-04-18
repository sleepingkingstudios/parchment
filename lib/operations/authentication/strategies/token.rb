# frozen_string_literal: true

require 'errors/authentication/expired_credential'
require 'errors/authentication/expired_session'
require 'errors/authentication/inactive_credential'
require 'errors/authentication/invalid_signature'
require 'errors/authentication/invalid_token'
require 'errors/authentication/missing_credential'
require 'operations/authentication/strategies'

module Operations::Authentication::Strategies
  # Strategy for authenticating with a JWT-serialized session.
  class Token < Cuprum::Operation
    def initialize(session_key:)
      validate_session_key(session_key)

      @session_key = session_key
    end

    private

    attr_reader :session_key

    def create_session(payload)
      credential = step { find_credential(payload['sub']) }
      expires_at = step { parse_timestamp(payload['exp']) }

      step { validate_credential(credential) }

      Authorization::Session.new(credential: credential, expires_at: expires_at)
    end

    def decode_token(token)
      JWT.decode(token, session_key, true, algorithm: 'HS256')
    rescue JWT::ExpiredSignature
      failure(Errors::Authentication::ExpiredSession.new)
    rescue JWT::VerificationError
      failure(Errors::Authentication::InvalidSignature.new)
    rescue JWT::DecodeError
      failure(Errors::Authentication::InvalidToken.new(token: token))
    end

    def find_credential(credential_id)
      credential = Authentication::Credential.where(id: credential_id).first

      return credential unless credential.nil?

      failure(
        Errors::Authentication::MissingCredential.new(
          credential_id: credential_id
        )
      )
    end

    def jwt_format
      base64 = '[A-Za-z0-9_\-]+={0,2}'

      /\A#{base64}\.#{base64}\.#{base64}\z/
    end

    def parse_timestamp(timestamp)
      Time.at(timestamp)
    rescue TypeError
      failure(Errors::Authentication::ExpiredSession.new)
    end

    def process(token)
      step { validate_token(token) }

      payload, _headers = step { decode_token(token) }

      step { create_session(payload) }
    end

    def validate_credential(credential)
      step { validate_credential_active(credential) }
      step { validate_credential_not_expired(credential) }
    end

    def validate_credential_active(credential)
      return if credential.active?

      failure(Errors::Authentication::InactiveCredential.new)
    end

    def validate_credential_not_expired(credential)
      return unless credential.expired?

      failure(Errors::Authentication::ExpiredCredential.new)
    end

    def validate_session_key(session_key)
      raise ArgumentError, "Session key can't be blank" if session_key.nil?

      unless session_key.is_a?(String)
        raise ArgumentError, 'Session key must be a String'
      end

      raise ArgumentError, "Session key can't be blank" if session_key.empty?
    end

    def validate_token(token)
      return if token.is_a?(String) && token.match?(jwt_format)

      failure(Errors::Authentication::InvalidToken.new(token: token))
    end
  end
end
