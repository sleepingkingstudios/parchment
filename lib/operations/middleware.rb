# frozen_string_literal: true

require 'cuprum/middleware'

require 'operations'

module Operations
  # Abstract base class for middleware.
  class Middleware < Cuprum::Operation
    include Cuprum::Middleware

    def initialize(**options)
      @options = options
    end

    attr_reader :options
  end
end
