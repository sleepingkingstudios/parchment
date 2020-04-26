# frozen_string_literal: true

require 'errors/authentication/failed_login'
require 'operations/authentication/generate_token'
require 'operations/authentication/strategies/password'

module Api::Authentication
  # Controller for creating and viewing authentication sessions.
  class SessionsController < Api::BaseController
    before_action :require_authenticated_user, except: :create

    def create
      responder.call(create_session, status: :created)
    end

    def show
      responder.call(show_user)
    end

    private

    def create_session
      steps do
        username = step :validate_username
        password = step :validate_password
        session  = step do
          operation = Operations::Authentication::Strategies::Password.new
          operation.call(username: username, password: password)
        end
        token = step :generate_token, session

        { token: token, user: session.user }
      end
    end

    def generate_token(session)
      Operations::Authentication::GenerateToken
        .new(session_key: session_key)
        .call(session)
    end

    def permitted_params
      params.permit(:password, :username)
    end

    def show_user
      Cuprum::Result.new(value: { user: @current_session.user })
    end

    def validate_password
      password = permitted_params[:password]

      return password if password.is_a?(String) && !password.empty?

      failure(
        Errors::InvalidParameters.new(errors: [['password', "can't be blank"]])
      )
    end

    def validate_username
      username = permitted_params[:username]

      return username if username.is_a?(String) && !username.empty?

      failure(
        Errors::InvalidParameters.new(errors: [['username', "can't be blank"]])
      )
    end
  end
end
