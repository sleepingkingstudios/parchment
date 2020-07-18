# frozen_string_literal: true

require 'operations/attributes/generate_slug'
require 'operations/records/assign_operation'
require 'operations/references'

module Operations::References
  # Updates the given reference record with the given attributes.
  class AssignOperation < Operations::Records::AssignOperation
    private

    def generate_slug(attributes:)
      attr_name  = record_class.slug_attribute
      attr_value = indifferent_fetch(attributes, attr_name)
      operation  = Operations::Attributes::GenerateSlug.new

      operation.call(attr_value)
    end

    def indifferent_fetch(hsh, key)
      hsh.fetch(key.to_s) { hsh[key.intern] }
    end

    def indifferent_merge(hsh, key, value)
      return hsh.merge(key.to_s => value) if hsh.key?(key.to_s)

      hsh.merge(key.intern => value)
    end

    def process(attributes: {}, record:)
      if attributes.is_a?(Hash) && slug_missing?(attributes)
        result = generate_slug(attributes: attributes)

        if result.success?
          attributes = indifferent_merge(attributes, :slug, result.value)
        end
      end

      super(attributes: attributes, record: record)
    end

    def slug_missing?(attributes)
      indifferent_fetch(attributes, :slug).blank?
    end
  end
end
