# frozen_string_literal: true

require 'fixtures/middleware'
require 'operations/steps'

module Fixtures::Middleware
  # Abstract base class for middleware.
  class Base < Cuprum::Operation
    include Operations::Steps

    def initialize(**options)
      @options = options
    end

    attr_reader :options

    private

    def process(next_command, data)
      next_command.call(data)
    end
  end
end
