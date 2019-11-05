# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/records/parameter_validations'
require 'operations/steps'

module Operations::Records
  # Finds a polymorphic record by the record type and id.
  class FindOnePolymorphicOperation < Cuprum::Operation
    include Operations::Records::ParameterValidations::One
    include Operations::Steps

    def initialize(association_name: nil)
      @association_name = association_name
    end

    private

    attr_reader :association_name

    def foreign_key_name
      association_name ? :"#{association_name}_id" : :id
    end

    def foreign_type_name
      association_name ? :"#{association_name}_type" : :type
    end

    def process(id:, type:)
      step :handle_invalid_id,           id,   as: foreign_key_name
      step :handle_invalid_foreign_type, type, as: foreign_type_name

      factory   = Operations::Records::Factory.for(type)
      operation = factory.find_one

      operation.call(id, as: foreign_key_name)
    end
  end
end
