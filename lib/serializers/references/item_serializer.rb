# frozen_string_literal: true

require 'serializers/record_serializer'
require 'serializers/references'

module Serializers::References
  # Serializes a References::Item as a JSON-compatible hash.
  class ItemSerializer < Serializers::RecordSerializer
    attributes \
      :cost,
      :data,
      :description,
      :name,
      :slug

    private

    def can_serialize?(object)
      object.is_a?(References::Item)
    end
  end
end
