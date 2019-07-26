# frozen_string_literal: true

# Abstract base class for API controllers.
class Api::BaseController < ApplicationController
  include SerializationHelper

  protect_from_forgery with: :null_session
end
