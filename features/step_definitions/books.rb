# frozen_string_literal: true

When('I visit the {string} page for book {string}') do |action, book_title|
  @current_page = "Features::Pages::Books::#{action.classify}".constantize.new
  @book         = Book.where(title: book_title).first
  book_id       = @book&.id || '00000000-0000-0000-0000-000000000000'

  @current_page.load(book_id: book_id)

  @current_page.wait_until_loading_message_invisible
end

When('I click the {string} button for book {string}') do |button, book_title|
  @current_page.wait_until_loading_message_invisible

  @book = Book.where(title: book_title).first
  rows  = @current_page.table_rows
  row   = rows.find { |item| item.text.start_with?(book_title) }

  expect(row).not_to be nil

  row.find_button(button).click
end

When('I click the {string} link for book {string}') do |link, book_title|
  @current_page.wait_until_loading_message_invisible

  @book = Book.where(title: book_title).first
  rows  = @current_page.table_rows
  row   = rows.find { |item| item.text.start_with?(book_title) }

  expect(row).not_to be nil

  row.find_link(link).click
end

When('I submit the Book form with invalid attributes') do
  expect(@current_page.has_book_form?).to be true

  @book_attributes =
    FactoryBot.attributes_for(:book, publication_date: '', publisher_name: '')

  @current_page.book_form.fill_attributes(@book_attributes)

  @current_page.book_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

When('I submit the Book form with valid attributes') do
  expect(@current_page.has_book_form?).to be true

  @book_attributes =
    FactoryBot.attributes_for(:book, title: 'Blasto the Flumph Spectre')

  @current_page.book_form.fill_attributes(@book_attributes)

  @current_page.book_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

Then('I should be on the {string} page for the book') do |action|
  expected_page = "Features::Pages::Books::#{action.classify}".constantize.new
  @current_page = expected_page

  expect(expected_page).to be_displayed(book_id: @book.id)
end

Then('I should be on the {string} page for book {string}') \
do |action, book_title|
  @book         = Book.where(title: book_title).first
  expected_page =
    "Features::Pages::Books::#{action.classify}".constantize.new
  @current_page = expected_page

  expect(expected_page).to be_displayed(book_id: @book.id)
end

Then('the Book block should display the book data') do
  expect(@current_page.has_book_block?).to be true

  text = @current_page.find_text('title')
  expect(text).to include @book.title

  text = @current_page.find_text('publisher')
  expect(text).to include @book.publisher_name

  text = @current_page.find_text('publication_date')
  expect(text).to include @book.publication_date.iso8601
end

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

Then('the Books table should not display the data for the book') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows).not_to include(
    satisfy { |row| row.text.start_with?(@book.title) }
  )
end

Then('the Book form should display the book data') do
  expect(@current_page.has_book_form?).to be true

  Features::Pages::Books::Form::ALL_INPUTS.each do |attr_name|
    value = @current_page.book_form.get_value(attr_name)

    expect(value.to_s).to be == @book_attributes[attr_name].to_s
  end
end

Then('the Book form should display the errors') do
  expect(@current_page.has_book_form?).to be true

  expected_errors = Book.new(@book_attributes).tap(&:valid?).errors.messages

  expected_errors.each do |attribute, errors|
    form_group = @current_page.book_form.find_field(attribute)

    expect(form_group).not_to be nil

    feedback = form_group.find('.invalid-feedback')

    errors.each do |error|
      expect(feedback.text).to include error
    end
  end
end
