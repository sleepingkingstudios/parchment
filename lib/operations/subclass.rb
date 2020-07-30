# frozen_string_literal: true

require 'operations'

module Operations
  # Mixin for defining operation subclasses associated with a record class.
  module Subclass
    class << self
      def inspect_with_ancestor(klass)
        named_ancestor = first_named_ancestor(klass)

        "#{Object.instance_method(:inspect).bind(klass).call}" \
        " (#{named_ancestor.name})"
      end

      private

      def first_named_ancestor(klass)
        klass.ancestors.find { |ancestor| name_method.bind(ancestor).call }
      end

      def name_method
        @name_method ||= Class.instance_method(:name)
      end
    end

    def subclass(arguments: [], as: nil, keywords: {})
      validate_arguments!(arguments)
      validate_keywords!(keywords)

      klass = Class.new(self)

      define_constructor(klass, arguments: arguments, keywords: keywords)
      define_reflections(klass, as: as)

      klass
    end

    private

    def define_constructor(klass, arguments:, keywords:)
      klass.define_method(:initialize) do |*args, **kwargs|
        merged = keywords.merge(kwargs)

        if merged.empty?
          super(*arguments, *args)
        else
          super(*arguments, *args, **merged)
        end
      end
    end

    def define_reflections(klass, as:)
      if as.nil? || as.empty?
        klass.define_singleton_method(:inspect) do
          Operations::Subclass.inspect_with_ancestor(self)
        end

        return
      end

      klass.define_singleton_method(:inspect) { as }

      klass.define_singleton_method(:name) { as }
    end

    def validate_arguments!(arguments)
      return if arguments.is_a?(Array)

      raise ArgumentError, 'arguments must be an Array', caller(1..-1)
    end

    def validate_keywords!(keywords)
      return if keywords.is_a?(Hash)

      raise ArgumentError, 'keywords must be a Hash', caller(1..-1)
    end
  end
end
