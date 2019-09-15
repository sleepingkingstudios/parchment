# frozen_string_literal: true

module Api
  # Abstract base class for API controllers.
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session
  end
end
