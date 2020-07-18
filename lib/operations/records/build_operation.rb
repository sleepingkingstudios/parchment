# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Initializes a new record from the given attributes.
  class BuildOperation < Operations::Records::BaseOperation
    include Operations::Records::ParameterValidations::One

    private

    def normalize_attributes(attributes)
      attributes.is_a?(Hash) ? attributes.symbolize_keys : {}
    end

    def process(attributes: {})
      step :handle_invalid_attributes, attributes

      attributes = normalize_attributes(attributes)
      unless attributes.key?(:id)
        attributes = attributes.merge(id: SecureRandom.uuid)
      end

      step :handle_invalid_id, attributes[:id]

      handle_unknown_attribute { record_class.new(attributes: attributes) }
    end
  end
end
