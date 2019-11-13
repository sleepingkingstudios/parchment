# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/records/parameter_validations'
require 'operations/steps'

module Operations::Records
  # Finds a record by the record type and id.
  class FindOnePolymorphicOperation < Cuprum::Operation
    include Operations::Records::ParameterValidations::One
    include Operations::Steps

    def initialize(as: nil, permitted_types: nil)
      @prefix          = as
      @permitted_types = Array(permitted_types).map do |type|
        type.is_a?(String) ? type.constantize : type
      end
    end

    private

    attr_reader :permitted_types

    attr_reader :prefix

    def foreign_key_name
      prefix ? :"#{prefix}_id" : :id
    end

    def foreign_type_name
      prefix ? :"#{prefix}_type" : :type
    end

    def handle_unexpected_foreign_type(foreign_type)
      return if permitted_types.empty?
      return if permitted_types.any? do |permitted_type|
        foreign_class = foreign_type.constantize

        foreign_class <= permitted_type
      end

      failure(unexpected_foreign_type_error)
    end

    def process(id:, type:)
      step :handle_invalid_id,              id,   as: foreign_key_name
      step :handle_invalid_foreign_type,    type, as: foreign_type_name
      step :handle_unexpected_foreign_type, type

      factory   = Operations::Records::Factory.for(type)
      operation = factory.find_one

      operation.call(id, as: foreign_key_name)
    end

    def unexpected_foreign_type_error
      message = "is not a valid #{foreign_type_name.to_s.tr('_', ' ')}"

      Errors::InvalidParameters.new(errors: [[foreign_type_name, message]])
    end
  end
end
