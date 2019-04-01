# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Initializes a new record for the given table from the given attributes.
  class BuildOperation < Operations::Records::BaseOperation
    private

    def process(attributes = {})
      unless attributes.is_a?(Hash)
        result.errors = [['attributes', 'must be a Hash']]

        return
      end

      record_class.new(attributes)
    rescue ActiveModel::UnknownAttributeError => exception
      attribute_name = unknown_attribute_name(exception)

      result.errors = [[attribute_name, 'unknown attribute']]
    end

    def unknown_attribute_name(exception)
      unknown_attribute_pattern.match(exception.message)['attribute_name']
    end

    def unknown_attribute_pattern
      /unknown attribute '(?<attribute_name>.*)'/
    end
  end
end
