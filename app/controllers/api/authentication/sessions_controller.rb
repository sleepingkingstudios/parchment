# frozen_string_literal: true

module Api::Authentication
  # Controller for creating and viewing authentication sessions.
  class SessionsController < Api::BaseController
    before_action :require_authenticated_user

    def show
      result = Cuprum::Result.new(value: { user: @current_session.user })

      responder.call(result)
    end
  end
end
