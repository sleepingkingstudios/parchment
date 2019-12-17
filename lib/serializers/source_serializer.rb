# frozen_string_literal: true

require 'serializers/record_serializer'

module Serializers
  # Serializes a Source as a JSON-compatible hash.
  class SourceSerializer < Serializers::RecordSerializer
    attributes \
      :metadata,
      :name,
      :origin_id,
      :origin_type,
      :playtest,
      :reference_id,
      :reference_type

    alias_method :source, :object

    private

    def can_serialize?(object)
      object.is_a?(Source)
    end
  end
end
