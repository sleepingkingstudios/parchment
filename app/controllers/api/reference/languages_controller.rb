# frozen_string_literal: true

# Base controller for performing read actions on Languages via a JSON API.
class Api::Reference::LanguagesController < Api::ResourcesController
  include Api::ReferencesMethods

  private

  def default_order
    { name: :asc }
  end

  def extract_dialects(data)
    record = data.fetch(resource_name)

    return {} if record.dialects.empty?

    { 'dialects' => record.dialects.to_a }
  end

  def extract_parent_language(data)
    record = data.fetch(resource_name)

    return {} if record.parent_language.nil?

    { 'parent_language' => record.parent_language }
  end

  def resource_class
    References::Language
  end

  def show_resource
    steps do
      data = step { super }
      data
        .merge(extract_dialects(data))
        .merge(extract_parent_language(data))
    end
  end
end
