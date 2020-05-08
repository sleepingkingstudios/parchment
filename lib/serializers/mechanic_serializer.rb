# frozen_string_literal: true

require 'serializers'

require 'serializers/record_serializer'

module Serializers
  # Serializes a Book as a JSON-compatible hash.
  class MechanicSerializer < Serializers::RecordSerializer
    attributes \
      :description,
      :name,
      :notes,
      :short_description,
      :type

    private

    def can_serialize?(object)
      object.is_a?(Mechanic)
    end
  end
end
