# frozen_string_literal: true

# rubocop:disable Metrics/MethodLength
def find_table_row(resource, definition, record, as: nil)
  primary_value = definition.fetch(record, definition.primary_attribute)
  table_rows    = as ? :"#{as}_table_rows" : :table_rows
  current_row   =
    @current_page.send(table_rows).find do |row|
      row.text.include?(primary_value.to_s)
    end

  expect(current_row).to(
    be_a(Capybara::Node::Element),
    "unable to find row for #{resource.singularize} with" \
    " #{definition.primary_attribute} #{primary_value}"
  )

  current_row
end
# rubocop:enable Metrics/MethodLength

################################################################################
#                                     DATA                                     #
################################################################################

Then('the {string} table should be empty') do |resource|
  @current_page.wait_until_loading_message_invisible

  resource_name = resource.split('::').last
  resource_name = resource_name.underscore.pluralize.tr('_', ' ')
  rows          = @current_page.table_rows
  empty_message = @current_page.empty_message

  expect(rows.size).to be <= 1

  expect(empty_message.text)
    .to be == "There are no #{resource_name} matching the criteria."
end

Then('the {string} table should display the data') do |resource|
  @current_page.wait_until_loading_message_invisible

  definition     = Features::Resources.find(resource)
  resource_class = definition.resource_class
  columns        = definition.table_columns

  if resource_class.count.zero?
    raise "There are no loaded fixtures for #{resource_class}"
  end

  expect(@current_page.table_rows.size).to be resource_class.count

  resource_class.all.each do |record|
    current_row = find_table_row(resource, definition, record)

    columns.each do |column|
      value = definition.fetch(record, column)

      expect(current_row.text).to include(value.to_s)
    end
  end
end

Then('the {string} table should not display the data for the resource') \
do |resource|
  @current_page.wait_until_loading_message_invisible

  definition    = Features::Resources.find(resource)
  rows          = @current_page.table_rows
  primary_value =
    definition.fetch(@current_resource, definition.primary_attribute)

  expect(rows).not_to include(
    satisfy { |row| row.text.include?(primary_value.to_s) }
  )
end

################################################################################
#                                 ASSOCIATIONS                                 #
################################################################################

Then('the {string} block should display the {string} table') \
do |resource, association|
  association_name    = association.underscore.pluralize
  definition          = Features::Resources.find(resource)
  association         = definition.send(association_name)
  association_class   = association.resource_class
  association_records = @current_resource.send(association_name)
  columns             = association.table_columns

  if association_class.count.zero?
    raise "There are no loaded fixtures for #{association_class}"
  end

  expect(@current_page.send(:"#{association_name}_table_rows").size)
    .to be association_records.count

  association_records.all.each do |record|
    current_row = find_table_row(
      association_name,
      association,
      record,
      as: association_name
    )

    columns.each do |column|
      value = definition.fetch(record, column)

      expect(current_row.text).to include(value.to_s)
    end
  end
end

Then('the {string} block should display the empty {string} table') \
do |_resource, association|
  association_name = association.underscore.pluralize
  rows             = @current_page.send(:"#{association_name}_table_rows")
  empty_message    =
    @current_page.send(:"#{association_name}_table_empty_message")

  expect(rows.size).to be <= 1

  expect(empty_message.text)
    .to be == "There are no #{association_name} matching the criteria."
end

################################################################################
#                               TABLE NAVIGATION                               #
################################################################################

When('I click the {string} button for {string} {string}') \
do |action, resource, attribute_value|
  @current_page.wait_until_loading_message_invisible

  definition        = Features::Resources.find(resource)
  resource_class    = definition.resource_class
  @current_resource =
    resource_class.where(definition.primary_attribute => attribute_value).first
  current_row       = find_table_row(resource, definition, @current_resource)

  current_row.find_button(action).click
end

When('I click the {string} link for {string} {string}') \
do |action, resource, attribute_value|
  @current_page.wait_until_loading_message_invisible

  definition        = Features::Resources.find(resource)
  resource_class    = definition.resource_class
  @current_resource =
    resource_class.where(definition.primary_attribute => attribute_value).first
  current_row       = find_table_row(resource, definition, @current_resource)

  current_row.find_link(action).click
end
