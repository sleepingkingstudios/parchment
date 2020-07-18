# frozen_string_literal: true

require 'operations/records/create_operation'
require 'operations/references/build_operation'
require 'operations/sources/set_source_operation'

module Operations::References
  # Initializes a new record for the given table from the given attributes,
  # validates the record, creates a source (if applicable), and persists the
  # record and the source to the database.
  class CreateOperation < Operations::Records::CreateOperation
    ORIGIN_KEYS =
      ['origin', 'origin_id', 'origin_type', :origin, :origin_id, :origin_type]
      .freeze
    private_constant :ORIGIN_KEYS

    def initialize(
      record_class,
      build_operation:      nil,
      set_source_operation: nil
    )
      build_operation ||=
        Operations::References::BuildOperation.new(record_class)

      super(record_class, build_operation: build_operation)

      @set_source_operation =
        set_source_operation || Operations::Sources::SetSourceOperation.new
    end

    private

    attr_reader :set_source_operation

    def extract_origin_attributes(attributes)
      return attributes unless attributes.is_a?(Hash)

      [attributes.except(*ORIGIN_KEYS), attributes.slice(*ORIGIN_KEYS)]
    end

    def process(attributes: {})
      attributes, origin_attributes = extract_origin_attributes(attributes)

      transaction do
        reference = step { super(attributes: attributes) }

        set_source_operation.call(
          reference: reference,
          **origin_attributes.symbolize_keys
        )
      end
    end
  end
end
