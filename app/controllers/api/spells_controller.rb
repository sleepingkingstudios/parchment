# frozen_string_literal: true

require 'operations/associations/find_many_polymorphic_query'
require 'operations/associations/find_one_polymorphic_query'

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

  def find_polymorphic_association(association, resource)
    Operations::Associations::FindOnePolymorphicQuery
      .new(
        association_name: association,
        resource_class:   resource_class
      )
      .call(resource)
  end

  def find_polymorphic_associations(association, resources)
    Operations::Associations::FindManyPolymorphicQuery
      .new(
        association_name: association,
        resource_class:   resource_class
      )
      .call(resources)
  end

  def index_resources
    steps do
      data         = step super
      resources    = data['spells']
      associations = step :find_polymorphic_associations, :source, resources

      data.merge(associations)
    end
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    Spell
  end

  def show_resource
    steps do
      data        = step super
      resource    = data['spell']
      association = step :find_polymorphic_association, :source, resource

      data.merge(association)
    end
  end
end
