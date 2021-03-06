# frozen_string_literal: true

require 'serializers/base_serializer'

module Serializers
  # Abstract base class for serializing an object's attributes.
  class AttributesSerializer < Serializers::BaseSerializer
    class << self
      def attribute(attr_name)
        guard_abstract_class!

        self::Attributes.send :def_delegator, :@object, attr_name

        attribute_definitions[attr_name.to_s] = -> { send(attr_name) }
      end

      def attributes(*attr_names)
        guard_abstract_class!

        attr_names.each { |attr_name| attribute(attr_name) }
      end

      protected

      def defined_attributes
        return attribute_definitions.dup unless superclass < BaseSerializer

        superclass.defined_attributes.merge(attribute_definitions)
      end

      private

      def attribute_definitions
        @attribute_definitions ||= {}
      end

      def guard_abstract_class!
        return unless self == Serializers::AttributesSerializer

        message =
          'AttributesSerializer is an abstract class and cannot define' \
          ' attributes.'

        raise RuntimeError, message, caller[1..-1]
      end

      def inherited(subclass)
        super

        subclass.const_set(:Attributes, Module.new { extend Forwardable })
        subclass.include(subclass::Attributes)
      end
    end

    private

    def serialize_object(_object)
      attributes = self.class.send(:defined_attributes)

      attributes.map.with_object({}) do |(attr_name, block), hsh|
        hsh[attr_name] = instance_exec(&block)
      end
    end
  end
end
