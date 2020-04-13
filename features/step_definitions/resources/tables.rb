# frozen_string_literal: true

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
  rows           = @current_page.table_rows
  columns        = definition.table_columns

  expect(rows.size).to be resource_class.count

  resource_class.all.each do |record|
    primary_value = definition.fetch(record, definition.primary_attribute)
    current_row   = rows.find { |row| row.text.include?(primary_value.to_s) }

    expect(current_row).to(
      be_a(Capybara::Node::Element),
      "unable to find row for #{resource.singularize} with" \
      " #{definition.primary_attribute} #{primary_value}"
    )

    columns.each do |column|
      value = definition.fetch(record, column)

      expect(current_row.text).to include(value.to_s)
    end
  end
end
