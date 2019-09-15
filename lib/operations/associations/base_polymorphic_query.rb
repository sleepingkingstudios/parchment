# frozen_string_literal: true

require 'operations/associations'
require 'operations/steps'

module Operations::Associations
  # Abstract base class for finding the records corresponding to a polymorphic
  # association.
  class BasePolymorphicQuery < Cuprum::Operation
    include Operations::Steps

    # @param association_name [String] The name of the polymorphic association.
    # @param resource_class [Class] The class of the resource.
    def initialize(association_name:, resource_class:)
      @association_name = association_name.to_s
      @resource_class   = resource_class
    end

    # @return [String] the name of the polymorphic association.
    attr_reader :association_name

    # @return [Class] the class of the resource.
    attr_reader :resource_class

    private

    def association
      @association ||= resource_class.reflections[association_name]
    end

    def foreign_key_name
      @foreign_key_name ||= association.foreign_key
    end

    def foreign_type_name
      @foreign_type_name ||= association.foreign_type
    end

    def operation_factory_for(klass)
      return klass::Factory if klass.const_defined?(:Factory)

      Operations::Records::Factory.new(klass)
    end
  end
end
