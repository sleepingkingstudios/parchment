# frozen_string_literal: true

module Api
  # Controller for displaying the current status of the application.
  class StatusController < Api::BaseController
    def show
      responder.call(show_status, action: :show)
    end

    private

    def postgres_available?
      ActiveRecord::Base.connected?
    rescue PG::ConnectionBad
      # :nocov:
      false
      # :nocov:
    end

    def show_status
      status = {
        postgres: postgres_available?
      }

      success(status)
    end
  end
end
