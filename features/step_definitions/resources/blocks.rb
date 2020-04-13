# frozen_string_literal: true

Then('the {string} block should display the data') do |resource|
  definition = Features::Resources.find(resource)

  expect(@current_page.send :"has_#{resource.underscore.singularize}_block?")
    .to be true

  definition.block_attributes.each do |attribute|
    text  = @current_page.find_text(attribute).gsub(/\n+/, ' ')
    value = definition.fetch(@current_resource, attribute).gsub(/\n+/, ' ')

    expect(text).to include(value)
  end
end
