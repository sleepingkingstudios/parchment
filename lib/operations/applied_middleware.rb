# frozen_string_literal: true

require 'operations/middleware'

module Operations
  # rubocop:disable Metrics/ClassLength

  # Command class that wraps a base command class with middleware.
  class AppliedMiddleware < Cuprum::Command
    class << self
      attr_reader :command

      attr_reader :middleware

      def subclass(command, middleware)
        validate_command(command, as: 'command')

        validate_middleware(middleware)

        if applied_middleware?(command)
          return merge_subclass(command, middleware)
        end

        build_subclass(command, middleware)
      end

      protected

      attr_writer :command

      attr_writer :middleware

      private

      def applied_middleware?(command)
        command = Object.const_get(command) if command.is_a?(String)

        command.is_a?(Class) && command < self
      end

      # rubocop:disable Metrics/MethodLength
      def build_subclass(command, middleware)
        Class.new(self) do
          self.command    = command
          self.middleware = middleware.dup

          define_method(:initialize) do |*args, **kwargs|
            if kwargs.empty?
              super(self.class.command, self.class.middleware, *args)
            else
              super(self.class.command, self.class.middleware, *args, **kwargs)
            end
          end
        end
      end
      # rubocop:enable Metrics/MethodLength

      def invalid_message(as:)
        "#{as} must be a command Class, a Class name, or a Proc"
      end

      def merge_subclass(parent, middleware)
        build_subclass(parent.command, middleware + parent.middleware)
      end

      def validate_command(command, as:, depth: 1)
        return if command.is_a?(Class) && command <= Cuprum::Command
        return if command.is_a?(Proc)

        if command.is_a?(String)
          return validate_command(Object.const_get(command), as: as, depth: 2)
        end

        raise ArgumentError, invalid_message(as: as), caller(depth..-1)
      rescue NameError
        raise ArgumentError, invalid_message(as: as), caller(depth..-1)
      end

      def validate_middleware(middleware)
        unless middleware.is_a?(Array)
          raise ArgumentError, 'middleware must be an Array', caller(1..-1)
        end

        middleware.each do |defn|
          validate_command(defn, as: 'middleware item', depth: 2)
        end
      end
    end

    def initialize(command, middleware, *args, **kwargs)
      validate_command(command)
      validate_middleware(middleware)

      @command    = build_definition(command,    *args, **kwargs)
      @middleware = build_middleware(middleware, *args, **kwargs)
      @applied = Operations::Middleware.apply(
        command:    @command,
        middleware: @middleware
      )
    end

    attr_reader :command

    attr_reader :middleware

    private

    attr_reader :applied

    attr_reader :command_definition

    attr_reader :middleware_definitions

    def build_command_class(klass, *args, **kwargs)
      kwargs.empty? ? klass.new(*args) : klass.new(*args, **kwargs)
    end

    def build_definition(definition, *args, **kwargs)
      return definition if definition.is_a?(Cuprum::Command)

      return build_proc(definition, *args, **kwargs) if definition.is_a?(Proc)

      if definition.is_a?(String)
        return build_command_class(
          Object.const_get(definition), *args, **kwargs
        )
      end

      build_command_class(definition, *args, **kwargs)
    end

    def build_middleware(middleware, *args, **kwargs)
      middleware
        .map { |definition| build_definition(definition, *args, **kwargs) }
        .freeze
    end

    def build_proc(proc, *args, **kwargs)
      kwargs.empty? ? proc.call(*args) : proc.call(*args, **kwargs)
    end

    def process(*args, **kwargs)
      kwargs.empty? ? applied.call(*args) : applied.call(*args, **kwargs)
    end

    def validate_command(command)
      return if command.is_a?(Cuprum::Command)

      self.class.send(:validate_command, command, as: 'command')
    end

    def validate_middleware(middleware)
      return if middleware.is_a?(Array) && middleware.all? do |command|
        command.is_a?(Cuprum::Command)
      end

      self.class.send(:validate_middleware, middleware)
    end
  end
  # rubocop:enable Metrics/ClassLength
end
