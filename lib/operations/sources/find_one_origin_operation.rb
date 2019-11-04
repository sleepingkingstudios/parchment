# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/records/parameter_validations'
require 'operations/sources'
require 'operations/steps'

module Operations::Sources
  # Finds the origin of a Source by the origin type and id.
  class FindOneOriginOperation < Cuprum::Operation
    include Operations::Records::ParameterValidations::One
    include Operations::Steps

    private

    def find_record(origin_type, origin_id)
      factory   = Operations::Records::Factory.for(origin_type)
      operation = factory.find_one

      operation.call(origin_id, as: :origin_id)
    end

    def handle_invalid_origin_type(type)
      return if Source::ORIGIN_TYPES.any? do |origin_type|
        foreign_class = type.constantize
        origin_class  = origin_type.constantize

        foreign_class >= origin_class
      end

      error = Errors::InvalidParameters.new(
        errors: [['origin_type', 'is not a valid origin type']]
      )

      failure(error)
    end

    def process(origin_id:, origin_type:)
      step :handle_invalid_id,           origin_id,   as: :origin_id
      step :handle_invalid_foreign_type, origin_type, as: :origin_type
      step :handle_invalid_origin_type,  origin_type
      step :find_record,                 origin_type, origin_id
    end
  end
end
