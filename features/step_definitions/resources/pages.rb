# frozen_string_literal: true

def action_page(action, resource)
  "Features::Pages::#{resource.pluralize}::#{action.classify}"
    .constantize
    .new
end

def be_displayed_for_resource(current_resource:, resource:)
  expect(current_resource).not_to be nil

  key = "#{resource.singularize.underscore}_id"

  unless current_resource.respond_to?(:slug)
    return be_displayed(key => current_resource.id)
  end

  be_displayed(
    key => current_resource.id
  ).or be_displayed(
    key => current_resource.slug
  )
end

When('I visit the {string} page for {string} {string}') \
do |action, resource, attribute_value|
  definition        = Features::Resources.find(resource)
  resource_class    = definition.resource_class
  @current_resource =
    resource_class.where(definition.primary_attribute => attribute_value).first
  @current_page     = action_page(action, resource)
  resource_id       =
    @current_resource&.id || '00000000-0000-0000-0000-000000000000'

  @current_page.load("#{resource.singularize.underscore}_id": resource_id)

  @current_page.wait_until_loading_message_invisible
end

Then('I should be on the {string} page for the {string}') \
do |action, resource|
  expected_page = action_page(action, resource)
  @current_page = expected_page

  expect(expected_page).to be_displayed_for_resource(
    current_resource: @current_resource,
    resource:         resource
  )
end

Then('I should be on the {string} page for {string} {string}') \
do |action, resource, attribute_value|
  definition        = Features::Resources.find(resource)
  resource_class    = definition.resource_class
  @current_resource =
    resource_class.where(definition.primary_attribute => attribute_value).first
  expected_page = action_page(action, resource)
  @current_page = expected_page

  expect(expected_page).to be_displayed_for_resource(
    current_resource: @current_resource,
    resource:         resource
  )
end
