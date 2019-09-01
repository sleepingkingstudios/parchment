# frozen_string_literal: true

require 'forwardable'

# Abstract base class for serializing an object to a JSON-compatible hash.
class ApplicationSerializer
  class << self
    def attribute(attr_name)
      guard_abstract_class!

      self::Attributes.send :def_delegator, :object, attr_name

      attribute_definitions[attr_name.to_s] = -> { send(attr_name) }
    end

    def attributes(*attr_names)
      guard_abstract_class!

      attr_names.each { |attr_name| attribute(attr_name) }
    end

    protected

    def defined_attributes
      return attribute_definitions.dup unless superclass < ApplicationSerializer

      superclass.defined_attributes.merge(attribute_definitions)
    end

    private

    def attribute_definitions
      @attribute_definitions ||= {}
    end

    def guard_abstract_class!
      return unless self == ApplicationSerializer

      message =
        'ApplicationSerializer is an abstract class and cannot define' \
        ' attributes.'

      raise RuntimeError, message, caller[1..-1]
    end

    def inherited(subclass)
      super

      subclass.const_set(:Attributes, Module.new { extend Forwardable })
      subclass.include(subclass::Attributes)
    end
  end

  def serialize(object)
    @object    = object
    attributes = self.class.send(:defined_attributes)

    attributes.map.with_object({}) do |(attr_name, block), hsh|
      hsh[attr_name] = instance_exec(&block)
    end
  end

  private

  attr_reader :object
end
