# frozen_string_literal: true

require 'errors/failed_validation'
require 'errors/invalid_parameters'
require 'errors/not_found'

# Abstract base class for API controllers.
class Api::BaseController < ApplicationController
  include SerializationHelper

  protect_from_forgery with: :null_session

  private

  def build_error_response(error)
    {
      error: serialize_error(error),
      ok:    false
    }
  end

  def build_json_response(data)
    {
      data: data,
      ok:   true
    }
  end

  def render_error(error, status: :unprocessable_entity)
    render json: build_error_response(error), status: status
  end

  def render_json(data, status: :ok)
    render json: build_json_response(data), status: status
  end

  def render_operation(operation, status: :ok)
    if operation.success?
      render_json(wrap_value(operation.value), status: status)
    else
      render_error(operation.error, status: :unprocessable_entity)
    end
  end

  def serialize_error(error)
    case error
    when Errors::FailedValidation, Errors::InvalidParameters, Errors::NotFound
      error.as_json
    else
      # :nocov:
      { 'message' => 'Something went wrong when processing the request.' }
      # :nocov:
    end
  end

  def wrap_value(value)
    if value.is_a?(Array)
      { resource_name => value.map { |item| serialize(item) } }
    else
      { resource_name.singularize => serialize(value) }
    end
  end
end
