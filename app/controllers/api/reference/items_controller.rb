# frozen_string_literal: true

# Base controller for performing read actions on Items via a JSON API.
class Api::Reference::ItemsController < Api::ResourcesController
  include Api::ReferencesMethods

  private

  def default_order
    { name: :asc }
  end

  def resource_class
    References::Item
  end
end
