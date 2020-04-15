# frozen_string_literal: true

# rubocop:disable Metrics/MethodLength
def find_table_row(resource, definition, record)
  primary_value = definition.fetch(record, definition.primary_attribute)
  current_row   =
    @current_page.table_rows.find do |row|
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

  resource_name = resource.underscore.pluralize
  rows          = @current_page.table_rows

  expect(rows.size).to be 1
  expect(rows.first.text)
    .to be == "There are no #{resource_name} matching the criteria."
end

Then('the {string} table should display the data') do |resource|
  @current_page.wait_until_loading_message_invisible

  definition     = Features::Resources.find(resource)
  resource_class = definition.resource_class
  columns        = definition.table_columns

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
