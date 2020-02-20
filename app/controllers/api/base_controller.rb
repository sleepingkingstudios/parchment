# frozen_string_literal: true

require 'operations/steps'

module Api
  # Abstract base class for API controllers.
  class BaseController < ApplicationController
    include Cuprum::Steps

    protect_from_forgery with: :null_session

    private

    def responder
      @responder ||= Responders::JsonResponder.new(self)
    end
  end
end
