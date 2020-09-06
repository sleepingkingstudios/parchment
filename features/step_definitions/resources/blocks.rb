# frozen_string_literal: true

################################################################################
#                                     DATA                                     #
################################################################################

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

################################################################################
#                                 ASSOCIATIONS                                 #
################################################################################

Then('the {string} block should display the {string} link') \
do |resource, association|
  association_name  = association.underscore.tr(' ', '_').singularize
  definition        = Features::Resources.find(resource)
  association_link  = @current_page.send(:"#{association_name}_link")
  root_url          = current_url[0...-current_path.length]
  relative_url      =
    definition.send(:"#{association_name}_url", @current_resource)

  expect(association_link.text)
    .to be == definition.send(:"#{association_name}_name", @current_resource)
  expect(association_link['href']).to be == "#{root_url}#{relative_url}"
end
