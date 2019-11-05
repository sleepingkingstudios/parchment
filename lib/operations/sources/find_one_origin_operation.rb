# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/records/parameter_validations'
require 'operations/records/find_one_polymorphic_operation'
require 'operations/sources'
require 'operations/steps'

module Operations::Sources
  # Finds the origin of a Source by the origin type and id.
  class FindOneOriginOperation < \
        Operations::Records::FindOnePolymorphicOperation
    def initialize
      super(association_name: :origin)
    end

    private

    def handle_invalid_foreign_type(origin_type, **opts)
      super(origin_type, **opts)

      step :handle_invalid_origin_type, origin_type
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
      super(id: origin_id, type: origin_type)
    end
  end
end
