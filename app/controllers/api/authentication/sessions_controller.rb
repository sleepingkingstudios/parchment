# frozen_string_literal: true

require 'errors/authentication/failed_login'
require 'operations/authentication/generate_token'
require 'operations/authentication/strategies/password'

module Api::Authentication
  # Controller for creating and viewing authentication sessions.
  class SessionsController < Api::BaseController
    skip_before_action :require_authenticated_user, only: :create

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
    rescue UndefinedSessionKeyError
      failure(Errors::Server::MissingSessionKey.new)
    end

    def input_valid?(input)
      input.is_a?(String) && !input.empty?
    end

    def permitted_params
      params.permit(:password, :username)
    end

    def show_user
      Cuprum::Result.new(value: { user: @current_session.user })
    end

    def validate_password
      password = permitted_params[:password]

      return password if input_valid?(password)

      failure(
        Errors::InvalidParameters.new(errors: [['password', "can't be blank"]])
      )
    end

    def validate_username
      username = permitted_params[:username]

      return username if input_valid?(username)

      errors   = [['username', "can't be blank"]]
      password = permitted_params[:password]
      errors << ['password', "can't be blank"] unless input_valid?(password)

      failure(Errors::InvalidParameters.new(errors: errors))
    end
  end
end
