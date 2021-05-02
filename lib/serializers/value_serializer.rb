# frozen_string_literal: true

require 'set'

require 'serializers/base_serializer'

module Serializers
  # Serializes a literal value as a JSON-compatible hash.
  class ValueSerializer < BaseSerializer
    LITERAL_TYPES = Set.new(
      [
        FalseClass,
        Float,
        NilClass,
        Integer,
        String,
        TrueClass
      ]
    ).freeze

    private

    def can_serialize?(object)
      LITERAL_TYPES.any? { |type| object.is_a?(type) }
    end

    def serialize_object(object)
      object
    end
  end
end
