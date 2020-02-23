# frozen_string_literal: true

# Base controller for performing CRUD actions on Mechanics via a JSON API.
class Api::MechanicsController < Api::ResourcesController
  PERMITTED_ATTRIBUTES = %i[
    description
    name
    notes
    short_description
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def default_order
    { name: :asc }
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end
end
