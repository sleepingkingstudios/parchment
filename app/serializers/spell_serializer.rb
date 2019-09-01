# frozen_string_literal: true

# Serializes a Spell as a JSON-compatible hash.
class SpellSerializer < RecordSerializer
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
