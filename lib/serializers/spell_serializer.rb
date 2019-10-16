# frozen_string_literal: true

require 'serializers/record_serializer'

module Serializers
  # Serializes a Spell as a JSON-compatible hash.
  class SpellSerializer < Serializers::RecordSerializer
    attributes \
      :casting_time,
      :description,
      :duration,
      :level,
      :material_component,
      :name,
      :range,
      :ritual,
      :school,
      :short_description,
      :slug,
      :somatic_component,
      :verbal_component

    alias_method :spell, :object

    private

    def can_serialize?(object)
      object.is_a?(Spell)
    end
  end
end
