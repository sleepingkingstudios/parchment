# frozen_string_literal: true

require 'cuprum/rails/controller'
require 'cuprum/rails/responders/json/resource'

require 'authentication/middleware'
require 'authentication/request'

# Abstract base class for API controllers.
class ApiController < ApplicationController
  include Cuprum::Rails::Controller

  def self.build_request(native_request:)
    Authentication::Request.build(request: native_request)
  end

  default_format :json

  protect_from_forgery with: :null_session

  middleware Authentication::Middleware

  responder :json, Cuprum::Rails::Responders::Json::Resource
end
