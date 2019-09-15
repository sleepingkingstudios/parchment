# frozen_string_literal: true

# Controller for performing CRUD actions on Spells via a JSON API.
class Api::SpellsController < Api::ResourcesController
  PERMITTED_ATTRIBUTES = %i[
    casting_time
    description
    duration
    level
    material_component
    name
    range
    ritual
    school
    somatic_component
    verbal_component
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    Spell
  end
end
