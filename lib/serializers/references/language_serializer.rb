# frozen_string_literal: true

require 'serializers/record_serializer'
require 'serializers/references'

module Serializers::References
  # Serializes a References::Language as a JSON-compatible hash.
  class LanguageSerializer < Serializers::RecordSerializer
    attributes \
      :name,
      :parent_language_id,
      :rarity,
      :script,
      :slug,
      :speakers

    private

    def can_serialize?(object)
      object.is_a?(References::Language)
    end
  end
end
