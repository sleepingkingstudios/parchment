# frozen_string_literal: true

def find_resource_form(resource, current_page)
  resource_name = resource.split('::').last

  current_page.send :"#{resource_name.underscore.singularize}_form"
end

def resource_form?(resource, current_page)
  resource_name = resource.split('::').last

  current_page.send :"has_#{resource_name.underscore.singularize}_form?"
end

When('I submit the {string} form with invalid attributes') do |resource|
  expect(resource_form?(resource, @current_page)).to be true

  definition           = Features::Resources.find(resource)
  resource_form        = find_resource_form(resource, @current_page)
  @resource_attributes = definition.invalid_attributes

  resource_form.fill_attributes(@resource_attributes)

  resource_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

When('I submit the {string} form with valid attributes') do |resource|
  expect(resource_form?(resource, @current_page)).to be true

  definition           = Features::Resources.find(resource)
  resource_form        = find_resource_form(resource, @current_page)
  @resource_attributes = definition.valid_attributes

  resource_form.fill_attributes(@resource_attributes)

  resource_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

Then('the {string} form should display the data') do |resource|
  expect(resource_form?(resource, @current_page)).to be true

  resource_form = find_resource_form(resource, @current_page)

  resource_form.class::ALL_INPUTS.each do |attr_name|
    value = resource_form.get_value(attr_name)

    expect(value.to_s).to be == @resource_attributes[attr_name].to_s
  end
end

Then('the {string} form should display the errors') do |resource|
  expect(resource_form?(resource, @current_page)).to be true

  definition      = Features::Resources.find(resource)
  resource_form   = find_resource_form(resource, @current_page)
  expected_errors =
    definition.resource_class.new(@resource_attributes).errors.messages

  expected_errors.each do |attribute, errors|
    form_group = resource_form.find_field(attribute)

    expect(form_group).not_to be nil

    feedback = form_group.find('.invalid-feedback')

    errors.each do |error|
      expect(feedback.text).to include error
    end
  end
end
