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

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

      step :handle_invalid_attributes, attributes

      attributes = normalize_attributes(attributes)
      unless attributes.key?(:id)
        attributes = attributes.merge(id: SecureRandom.uuid)
      end

      step :handle_invalid_id, attributes[:id]

      handle_unknown_attribute { record_class.new(attributes) }
    end
  end
end
