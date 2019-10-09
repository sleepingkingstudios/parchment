# frozen_string_literal: true

Then('the Spells table should be empty') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be 1
  expect(rows.first.text).to be == 'There are no spells matching the criteria.'
end

Then('the Spells table should display the spell data') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be Spell.count

  Spell.all.each do |spell|
    expect(rows).to include(
      satisfy { |row| row.text.start_with?(spell.name) }
    )
  end
end
