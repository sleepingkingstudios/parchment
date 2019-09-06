# frozen_string_literal: true

module Spec::Support
  class Model
    class << self
      def before_validation(method_name = nil, &block)
        block ||= -> { public_send(method_name) }

        hooks[:before_validation] << block
      end

      def evaluate_hooks(model, key)
        hooks[key].each { |block| model.instance_exec(&block) }
      end

      private

      def hooks
        @hooks ||= Hash.new { |hsh, key| hsh[key] = [] }
      end
    end

    def initialize(attributes = {})
      attributes.each { |name, value| public_send(:"#{name}=", value) }
    end

    def valid?
      self.class.evaluate_hooks(self, :before_validation)
    end
  end
end
