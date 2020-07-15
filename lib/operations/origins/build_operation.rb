# frozen_string_literal: true

require 'operations/attributes/generate_slug'
require 'operations/origins'
require 'operations/records/build_operation'

module Operations::Origins
  # Initializes a new origin from the given attributes.
  class BuildOperation < Operations::Records::BuildOperation
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

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

      if attributes.is_a?(Hash) && slug_missing?(attributes)
        result = generate_slug(attributes: attributes)

        if result.success?
          attributes = indifferent_merge(attributes, :slug, result.value)
        end
      end

      super(attributes)
    end

    def slug_missing?(attributes)
      indifferent_fetch(attributes, :slug).blank?
    end
  end
end
