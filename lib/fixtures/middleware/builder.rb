# frozen_string_literal: true

require 'fixtures/middleware'

module Fixtures::Middleware
  # Builder class to create middleware commands from a name/options tuple.
  class Builder
    def build(name, **options)
      validate_name(name)

      middleware_class = resolve_middleware(name)

      middleware_class.new(**options)
    end

    private

    def qualified_name(name)
      return name if name.to_s =~ /::/

      "Fixtures::Middleware::#{name.to_s.classify}"
    end

    def resolve_middleware(name)
      qualified_name(name).constantize
    end

    def validate_name(name)
      raise ArgumentError, "name can't be blank" if name.blank?

      return if name.is_a?(String) || name.is_a?(Symbol)

      raise ArgumentError, 'name must be a String or Symbol'
    end
  end
end
