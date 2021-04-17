# frozen_string_literal: true

# Base controller for performing read actions on MagicItems via a JSON API.
class Api::Reference::Items::MagicItemsController < Api::ResourcesController
  include Api::ReferencesMethods

  PERMITTED_ATTRIBUTES = %i[
    category
    cost
    description
    name
    rarity
    short_description
    slug
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def default_order
    { name: :asc }
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    References::Items::MagicItem
  end
end
