# frozen_string_literal: true

require 'operations'

module Operations
  # Mixin for defining operation subclasses associated with a record class.
  module Subclass
    class << self
      def inspect_with_ancestor(klass)
        named_ancestor = first_named_ancestor(klass)

        "#{Object.instance_method(:inspect).bind(klass).call}" \
        " (#{name_method.bind(named_ancestor).call})"
      end

      private

      def first_named_ancestor(klass)
        klass.ancestors.find { |ancestor| name_method.bind(ancestor).call }
      end

      def name_method
        @name_method ||= Class.instance_method(:name)
      end
    end

    def applied_arguments
      return @applied_arguments if @applied_arguments

      superclass.is_a?(Operations::Subclass) ? superclass.applied_arguments : []
    end

    def applied_keywords
      return @applied_keywords if @applied_keywords

      superclass.is_a?(Operations::Subclass) ? superclass.applied_keywords : {}
    end

    def subclass(arguments: [], as: nil, keywords: {})
      validate_arguments!(arguments)
      validate_keywords!(keywords)

      klass = Class.new(self)

      apply_parameters(klass,   arguments: arguments, keywords: keywords)
      define_constructor(klass, arguments: arguments, keywords: keywords)
      define_reflections(klass, as: as)

      klass
    end

    protected

    attr_writer :applied_arguments

    attr_writer :applied_keywords

    private

    def apply_parameters(klass, arguments:, keywords:)
      klass.applied_arguments += arguments

      klass.applied_keywords = klass.applied_keywords.merge(keywords)
    end

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
