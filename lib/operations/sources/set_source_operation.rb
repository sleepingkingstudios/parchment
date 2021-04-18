# frozen_string_literal: true

require 'errors/sources/invalid_reference'
require 'operations/sources'
require 'operations/sources/create_operation'

module Operations::Sources
  # Creates and assigns the source relation for a referenced domain object.
  class SetSourceOperation < Cuprum::Operation
    def initialize(create_source_operation: nil)
      @create_source_operation =
        create_source_operation ||
        Operations::Sources::CreateOperation.new
    end

    private

    attr_reader :create_source_operation

    def handle_invalid_reference(reference)
      return if reference_types.any? { |type| reference.is_a?(type) }

      error = Errors::Sources::InvalidReference.new

      failure(error)
    end

    # rubocop:disable Metrics/MethodLength
    def process(origin: nil, origin_id: nil, origin_type: nil, reference:)
      step { handle_invalid_reference(reference) }

      return reference if same_origin?(
        origin:      origin,
        origin_id:   origin_id,
        origin_type: origin_type,
        reference:   reference
      )

      remove_source(reference)

      return reference if [origin, origin_id, origin_type].all?(&:blank?)

      set_source(
        origin:      origin,
        origin_id:   origin_id,
        origin_type: origin_type,
        reference:   reference
      )
    end
    # rubocop:enable Metrics/MethodLength

    def reference_types
      Source::REFERENCE_TYPES.map(&:constantize)
    end

    def remove_source(reference)
      reference.tap { reference.source = nil }
    end

    def same_origin?(origin:, origin_id:, origin_type:, reference:)
      reference.source &&
        reference.source.origin_id == (origin_id || origin&.id) &&
        reference.source.origin_type == (origin_type || origin&.class&.name)
    end

    def set_source(reference:, **attributes)
      source = step do
        create_source_operation
          .call(attributes: attributes.merge(reference: reference))
      end

      reference.tap { reference.source = source }
    end
  end
end
