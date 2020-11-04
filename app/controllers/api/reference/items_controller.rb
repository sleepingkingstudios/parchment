# frozen_string_literal: true

# Base controller for performing read actions on Items via a JSON API.
class Api::Reference::ItemsController < Api::ResourcesController
  include Api::ReferencesMethods

  PERMITTED_ATTRIBUTES = %i[
    cost
    description
    name
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
    References::Item
  end
end
