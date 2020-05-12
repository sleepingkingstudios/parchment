# frozen_string_literal: true

# Controller for performing CRUD actions on Books via a JSON API.
class Api::BooksController < Api::ResourcesController
  before_action :require_authenticated_user

  PERMITTED_ATTRIBUTES = %i[
    playtest
    publication_date
    publisher_name
    slug
    title
  ].freeze
  private_constant :PERMITTED_ATTRIBUTES

  private

  def default_order
    { title: :asc }
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def resource_class
    Book
  end
end
