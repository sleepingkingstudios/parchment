# frozen_string_literal: true

require 'cuprum/steps'

require 'operations/authentication/extract_header'
require 'operations/authentication/strategies/token'
require 'responders/json_responder'

module Api
  # Abstract base class for API controllers.
  class BaseController < ApplicationController
    include Cuprum::Steps

    protect_from_forgery with: :null_session

    before_action :deserialize_session

    private

    attr_reader :current_session

    def deserialize_session
      result = steps do
        token = step :extract_authorization_token

        step :parse_authorization_token, token
      end

      @current_session =
        if result.success?
          result.value
        else
          Authorization::AnonymousSession.new(expires_at: 1.day.from_now)
        end
    end

    def extract_authorization_token
      Operations::Authentication::ExtractHeader.new.call(request.headers.env)
    end

    def parse_authorization_token(token)
      Operations::Authentication::Strategies::Token.new.call(token)
    end

    def responder
      @responder ||= Responders::JsonResponder.new(self)
    end
  end
end
