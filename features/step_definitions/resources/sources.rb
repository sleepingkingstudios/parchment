# frozen_string_literal: true

def find_resource_form(resource, current_page)
  resource_name = resource.split('::').last

  current_page.send :"#{resource_name.underscore.singularize}_form"
end

def find_source(source_name:, source_type:)
  case source_type
  when 'Book'
    Book.where(title: source_name).first
  end
end

def resource_block?(resource, current_page)
  current_page.send :"has_#{resource.underscore.singularize}_block?"
end

def resource_form?(resource, current_page)
  resource_name = resource.split('::').last

  current_page.send :"has_#{resource_name.underscore.singularize}_form?"
end

When('I select the source {string} {string} for the {string}') \
do |source_type, source_name, resource|
  expect(resource_form?(resource, @current_page)).to be true

  source        =
    find_source(source_name: source_name, source_type: source_type)
  resource_form = find_resource_form(resource, @current_page)

  resource_form
    .find_select_option('source', "#{source_type}:#{source.id}")
    .select_option
end

Then('the {string} block should show source {string}') \
do |resource, source_name|
  expect(resource_block?(resource, @current_page)).to be true

  text = @current_page.find_text('source')

  expect(text).to be == source_name
end
