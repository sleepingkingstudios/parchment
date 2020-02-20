# frozen_string_literal: true

require 'fixtures/middleware/base'
require 'operations/records/factory'
require 'operations/records/parameter_validations'
require 'operations/sources/set_source_operation'

module Fixtures::Middleware
  # Middleware command to create a source relationship.
  class SetSource < Fixtures::Middleware::Base
    include Operations::Records::ParameterValidations::One

    private

    def create_source(origin:, reference:, source_data:)
      metadata = source_data.fetch(:metadata, source_data.fetch('metadata', {}))

      step { set_source_operation.call(origin: origin, reference: reference) }

      return reference if !metadata.is_a?(Hash) || metadata.empty?

      source   = reference.source
      metadata = source.metadata.merge(metadata)

      source.update_attribute(:metadata, metadata)

      reference
    end

    def find_origin(source_data)
      origin_type = source_data.fetch(:type, source_data['type'])

      step :handle_invalid_foreign_type,    origin_type, as: 'origin_type'
      step :handle_unexpected_foreign_type, origin_type

      records = step do
        Operations::Records::Factory
          .for(origin_type)
          .find_matching(optional: false, unique: true)
          .call(where: source_data.except(:metadata, :type, 'metadata', 'type'))
      end

      records.first
    end

    def handle_invalid_reference(reference)
      return if reference_types.any? { |type| reference.is_a?(type) }

      error = Errors::Sources::InvalidReference.new

      failure(error)
    end

    def handle_unexpected_foreign_type(foreign_type)
      return if origin_types.empty?
      return if origin_types.any? do |permitted_type|
        foreign_class = foreign_type.constantize

        foreign_class <= permitted_type
      end

      failure(unexpected_foreign_type_error)
    end

    def non_persisted_record?(value)
      value.is_a?(ApplicationRecord) && !value.persisted?
    end

    def origin_types
      Source::ORIGIN_TYPES.map(&:constantize)
    end

    def process(next_command, attributes) # rubocop:disable Metrics/MethodLength
      source_data = attributes.fetch(:source, attributes.fetch('source', {}))
      reference   =
        step { super(next_command, attributes.except(:source, 'source')) }

      return success(reference) if reference.is_a?(Hash)
      return success(reference) if non_persisted_record?(reference)
      return success(reference) if source_data.blank?

      step :handle_invalid_reference, reference

      origin = step :find_origin, source_data
      step :create_source,
        origin:      origin,
        reference:   reference,
        source_data: source_data

      reference
    end

    def reference_types
      Source::REFERENCE_TYPES.map(&:constantize)
    end

    def unexpected_foreign_type_error
      message = 'is not a valid origin type'

      Errors::InvalidParameters.new(errors: [['origin_type', message]])
    end

    def set_source_operation
      Operations::Sources::SetSourceOperation.new
    end
  end
end
