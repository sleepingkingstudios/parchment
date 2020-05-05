# frozen_string_literal: true

require 'cuprum/steps'

require 'errors/server/missing_session_key'
require 'operations/authentication/extract_header'
require 'operations/authentication/strategies/token'
require 'responders/json_responder'

module Api
  # Abstract base class for API controllers.
  class BaseController < ApplicationController
    include Cuprum::Steps

    # Exception class when the session key is undefined.
    class UndefinedSessionKeyError < StandardError; end

    protect_from_forgery with: :null_session

    private

    def authenticate_user
      result = deserialize_session

      @current_session =
        if result.success?
          result.value
        else
          Authorization::AnonymousSession.new(expires_at: 1.day.from_now)
        end
    end

    def current_session
      @current_session ||=
        Authorization::AnonymousSession.new(expires_at: 1.day.from_now)
    end

    def deserialize_session
      steps do
        token = step :extract_authorization_token

        step :parse_authorization_token, token
      end
    end

    def extract_authorization_token
      Operations::Authentication::ExtractHeader.new.call(request.headers.env)
    end

    def parse_authorization_token(token)
      Operations::Authentication::Strategies::Token
        .new(session_key: session_key)
        .call(token)
    end

    def require_authenticated_user
      result = deserialize_session

      if result.success?
        @current_session = result.value

        return
      end

      response.headers['WWW-Authenticate'] = 'Bearer'

      responder.call(result)
    rescue UndefinedSessionKeyError
      responder.call(failure(Errors::Server::MissingSessionKey.new))
    end

    def responder
      @responder ||= Responders::JsonResponder.new(self)
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
