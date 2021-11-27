# frozen_string_literal: true

require 'cuprum/command'
require 'cuprum/middleware'

require 'authentication'
require 'operations/authentication/strategies/token'

module Authentication
  # Middleware for requiring an authenticated user for an endpoint.
  class Middleware < Cuprum::Command
    include Cuprum::Middleware

    # Exception class when the session key is undefined.
    class UndefinedSessionKeyError < StandardError; end

    private

    def authorization_header(request)
      header = request.authorization.presence

      return nil unless header =~ /\Abearer ./i

      header.sub(/\Abearer /i, '')
    end

    def authorization_param(request)
      return nil unless Rails.env.development?

      request.params['token'].presence
    end

    def authorization_token(request)
      authorization_header(request) || authorization_param(request)
    end

    def parse_token(token)
      Operations::Authentication::Strategies::Token
        .new(session_key: session_key)
        .call(token)
    end

    def process(next_command, request:)
      token   = step { authorization_token(request) }
      session = step { parse_token(token) }

      request.session = session

      super
    end

    def session_key
      key = ENV.fetch(
        'AUTHENTICATION_SESSION_KEY',
        Rails.application.credentials.authentication&.fetch(:session_key)
      )

      return key unless key.blank?

      raise UndefinedSessionKeyError, 'Session key is undefined'
    end
  end
end
