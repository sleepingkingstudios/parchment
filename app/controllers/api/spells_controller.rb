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
    slug
    short_description
    somatic_component
    verbal_component
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def default_order
    { name: :asc }
  end

  def extract_sources
    data    = yield
    spells  = Array(data.fetch('spells'))
    sources =
      spells
      .reduce([]) do |ary, spell|
        next ary if spell.source.blank?

        ary << spell.source
      end

    success(data.merge('sources' => sources))
  end

  def index_resources
    extract_sources { step super }
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    Spell
  end
end
