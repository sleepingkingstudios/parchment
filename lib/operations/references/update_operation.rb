# frozen_string_literal: true

require 'operations/records/update_operation'
require 'operations/references/assign_operation'
require 'operations/sources/set_source_operation'

module Operations::References
  # Assigns the given attributes to the given record, validates the record,
  # creates a source (if applicable) and removes the old source (if any), and
  # persists the record and the source to the database.
  class UpdateOperation < Operations::Records::UpdateOperation
    ORIGIN_KEYS =
      ['origin', 'origin_id', 'origin_type', :origin, :origin_id, :origin_type]
      .freeze
    private_constant :ORIGIN_KEYS

    def initialize(
      record_class,
      assign_operation:     nil,
      set_source_operation: nil
    )
      assign_operation ||=
        Operations::References::AssignOperation.new(record_class)

      super(record_class, assign_operation: assign_operation)

      @set_source_operation =
        set_source_operation || Operations::Sources::SetSourceOperation.new
    end

    private

    attr_reader :set_source_operation

    def extract_origin_attributes(attributes)
      return attributes unless attributes.is_a?(Hash)

      [attributes.except(*ORIGIN_KEYS), attributes.slice(*ORIGIN_KEYS)]
    end

    def process(attributes:, record:)
      attributes, origin_attributes = extract_origin_attributes(attributes)

      transaction do
        reference = step { super(attributes: attributes, record: record) }

        set_source_operation.call(
          reference: reference,
          **origin_attributes.symbolize_keys
        )
      end
    end
  end
end
