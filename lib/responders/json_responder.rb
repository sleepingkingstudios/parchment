# frozen_string_literal: true

require 'errors/server/base'
require 'responders/base_responder'
require 'serializers'

module Responders
  # Accepts a passing or failing Result and generates a JSON response.
  class JsonResponder < Responders::BaseResponder
    def call(result, **options)
      handle_exceptions { super }
    end

    private

    def handle_exceptions
      yield
    rescue Serializers::SerializerError => exception
      log_exception(exception)

      error   = Cuprum::Error.new(message: exception.message)
      result  = Cuprum::Result.new(error: error)

      respond_to_failure(result)
    end

    def log_exception(exception) # rubocop:disable Metrics/AbcSize
      message = +'Internal Server Error in '
      message << controller_name
      message << '#' << options[:action].to_s if options.key?(:action)
      message << ': '
      message << exception.message << ' (' << exception.class.name << ')'

      Rails.logger.error(message)
    end

    def respond_to_failure(result)
      error  = result.error
      status = error_status(error)
      json   = {
        'ok'    => false,
        'error' => serialize_error(error)
      }

      render json: json, status: status
    end

    def respond_to_success(result)
      data = result.value
      json = {
        'ok'   => true,
        'data' => serialize_data(data)
      }

      render json: json, status: options.fetch(:status, :ok)
    end

    def serialize_data(data)
      return {} if data.nil?

      data.each.with_object({}) do |(key, value), hsh|
        hsh[key.to_s] = serialize_value(value)
      end
    end

    def serialize_error(error) # rubocop:disable Metrics/MethodLength
      case error
      when Errors::Authentication::FailedLogin
        { 'message' => 'Unable to log in with the given credentials' }
      when Errors::Authentication::Base
        { 'message' => 'Unable to authenticate user.' }
      when Errors::FailedValidation, Errors::InvalidParameters, Errors::NotFound
        error.as_json
      when Errors::Server::Base
        return error.as_json if Rails.env.development?

        { 'message' => 'Something went wrong when processing the request.' }
      else
        { 'message' => 'Something went wrong when processing the request.' }
      end
    end

    def serialize_value(value)
      return Serializers.serialize(value) unless value.is_a?(Array)

      return [] if value.empty?

      serializers = Hash.new do |hsh, item|
        hsh[item] = Serializers.serializer_for!(item)
      end

      value.map do |item|
        serializers[item].call(item)
      end
    end
  end
end
