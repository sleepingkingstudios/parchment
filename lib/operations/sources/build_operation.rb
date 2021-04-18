# frozen_string_literal: true

require 'errors/sources/invalid_origin'
require 'operations/associations/resolve_one_polymorphic_operation'
require 'operations/records/base_operation'
require 'operations/records/build_operation'
require 'operations/sources/assign_metadata_operation'
require 'operations/sources/resolve_origin_operation'
require 'operations/sources/resolve_reference_operation'

module Operations::Sources
  # Initializes a new source from the given attributes, origin, and reference.
  class BuildOperation < Operations::Records::BaseOperation
    def initialize(
      assign_metadata_operation: nil,
      resolve_origin_operation: nil,
      resolve_reference_operation: nil
    )
      super(Source)

      @assign_metadata_operation =
        assign_metadata_operation ||
        Operations::Sources::AssignMetadataOperation.new
      @resolve_origin_operation =
        resolve_origin_operation ||
        Operations::Sources::ResolveOriginOperation.new
      @resolve_reference_operation =
        resolve_reference_operation ||
        Operations::Sources::ResolveReferenceOperation.new
    end

    private

    attr_reader :assign_metadata_operation

    attr_reader :resolve_origin_operation

    attr_reader :resolve_reference_operation

    def process(attributes: {}) # rubocop:disable Metrics/AbcSize
      step { handle_invalid_attributes(attributes) }

      origin     = step { resolve_origin_operation.call(attributes) }
      reference  = step { resolve_reference_operation.call(attributes) }
      attributes = strip_attributes(attributes).merge(
        origin:    origin,
        reference: reference
      )
      record = handle_unknown_attribute { record_class.new(attributes) }

      assign_metadata_operation.call(record)
    end

    def strip_attributes(attributes)
      attributes.except(
        :origin_id,
        :origin_type,
        :reference_id,
        :reference_type,
        'origin_id',
        'origin_type',
        'reference_id',
        'reference_type'
      )
    end
  end
end
