# frozen_string_literal: true

require 'operations'

module Operations
  # Abstract base class for middleware.
  class Middleware < Cuprum::Operation
    def self.apply(command:, middleware:)
      return command if middleware.empty?

      middleware.reverse_each.reduce(command) do |next_command, cmd|
        cmd.curry(next_command)
      end
    end

    def initialize(**options)
      @options = options
    end

    attr_reader :options

    private

    def process(next_command, *args, **kwargs)
      if kwargs.empty?
        step { next_command.call(*args) }
      else
        step { next_command.call(*args, **kwargs) }
      end
    end
  end
end
