# frozen_string_literal: true

# Abstract base class for API controllers.
class Api::BaseController < ApplicationController
  protect_from_forgery with: :null_session
end
