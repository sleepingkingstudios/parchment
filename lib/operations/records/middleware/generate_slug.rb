# frozen_string_literal: true

require 'operations/attributes/generate_slug'
require 'operations/middleware'
require 'operations/records/middleware'
require 'operations/records/subclass'

module Operations::Records::Middleware
  # Middleware operation for generating a slug from an attributes hash.
  class GenerateSlug < Operations::Middleware
    extend Operations::Records::Subclass

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize(record_class)
      @record_class = record_class
    end

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

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

    def process(next_command, attributes: {}, **kwargs)
      if attributes.is_a?(Hash) && slug_missing?(attributes)
        result = generate_slug(attributes: attributes)

        if result.success?
          attributes = indifferent_merge(attributes, :slug, result.value)
        end
      end

      super(next_command, attributes: attributes, **kwargs)
    end

    def slug_missing?(attributes)
      indifferent_fetch(attributes, :slug).blank?
    end
  end
end
