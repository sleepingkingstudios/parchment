# frozen_string_literal: true

require 'operations'

module Operations
  # Step-based process flow for Parchment operations.
  module Steps
    def self.extract_result(receiver, value, args)
      return value.to_cuprum_result if value.respond_to?(:to_cuprum_result)

      if value.is_a?(String) || value.is_a?(Symbol)
        result = receiver.send(value, *args)

        return result if result.respond_to?(:to_cuprum_result)

        return receiver.send(:success, result)
      end

      message =
        'expected parameter to be a result, an operation, or a method name,' \
        " but was #{value.inspect}"

      raise ArgumentError, message, caller[1..-1]
    end

    def call(*args)
      # NOTE: Ivar assignment duplicates logic from Cuprum::Operation, since the
      # module is included *after* the Operation mixin. This resolves an issue
      # when the last value in #process is a failing step.
      #
      # Remove the assignment when defining for generic Cuprum::Command objects.
      # Also remove #to_cuprum_result call and the return of self.
      @result = catch(:cuprum_failed_step) { super }.to_cuprum_result

      self
    end

    private

    def step(value, *args)
      result = Operations::Steps.extract_result(self, value, args)

      return result.value if result.success?

      throw :cuprum_failed_step, result
    end
  end
end
