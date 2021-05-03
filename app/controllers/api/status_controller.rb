# frozen_string_literal: true

module Api
  # Controller for displaying the current status of the application.
  class StatusController < Api::BaseController
    skip_before_action :require_authenticated_user

    class Document
      include Mongoid::Document
    end

    def show
      responder.call(show_status, action: :show)
    end

    private

    def mongodb_available?
      Document.mongo_client.database_names

      true
    rescue Mongo::Error::NoServerAvailable
      false
    end

    def postgres_available?
      ActiveRecord::Base.connected?
    rescue PG::ConnectionBad
      # :nocov:
      false
      # :nocov:
    end

    def show_status
      status = {
        mongodb:  mongodb_available?,
        postgres: postgres_available?
      }

      success(status)
    end
  end
end
