# frozen_string_literal: true

Then('the Books table should be empty') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be 1
  expect(rows.first.text).to be == 'There are no books matching the criteria.'
end

Then('the Books table should display the books data') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be Book.count

  Book.all.each do |book|
    expect(rows).to include(
      satisfy do |row|
        row.text.start_with?(book.title)

        row.text.include?(book.publisher_name)
      end
    )
  end
end
