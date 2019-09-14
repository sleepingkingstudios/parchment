# frozen_string_literal: true

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
      data.each.with_object({}) do |(key, value), hsh|
        hsh[key.to_s] = serialize_value(value)
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

    def serialize_value(value)
      return Serializers.serialize(value) unless value.is_a?(Array)

      serializer = Serializers.serializer_for!(value.first)

      value.map { |item| serializer.call(item) }
    end
  end
end
