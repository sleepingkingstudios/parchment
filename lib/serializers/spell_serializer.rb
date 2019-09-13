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
      :somatic_component,
      :verbal_component

    alias_method :spell, :object
  end
end
