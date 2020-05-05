# frozen_string_literal: true

require 'cuprum/error'

require 'errors/server'

module Errors::Server
  # Cuprum error for an unhandled server exception.
  class UnhandledException < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'server.unhandled_exception'

    # @param exception [Exception] The unhandled exception.
    def initialize(exception:)
      @exception = exception

      super(message: generate_message)
    end

    attr_reader :exception

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => serialize_exception,
        'message' => message,
        'type'    => type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      self.class::TYPE
    end

    private

    def generate_message
      message =
        "Unhandled server exception #{exception.class}: #{exception.message}"

      return message unless exception.cause

      message +
        " (caused by #{exception.cause.class}: #{exception.cause.message})"
    end

    def serialize_exception # rubocop:disable Metrics/AbcSize
      data = {
        'exception_class'   => exception.class.name,
        'exception_message' => exception.message
      }

      return data unless exception.cause

      data.merge(
        'cause_class'   => exception.cause.class.name,
        'cause_message' => exception.cause.message
      )
    end
  end
end
