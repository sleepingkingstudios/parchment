# frozen_string_literal: true

# Base controller for performing read actions on Skills via a JSON API.
class Api::Reference::SkillsController < Api::ResourcesController
  include Api::ReferencesMethods

  private

  def default_order
    { name: :asc }
  end

  def resource_class
    References::Skill
  end
end
