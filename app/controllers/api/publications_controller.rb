# frozen_string_literal: true

# Controller for performing CRUD actions on Publications via a JSON API.
class Api::PublicationsController < Api::ResourcesController
  PERMITTED_ATTRIBUTES = %i[
    abbreviation
    name
    playtest
    publication_date
    publisher_name
    slug
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    Publication
  end
end
