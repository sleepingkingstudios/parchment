# frozen_string_literal: true

When('I open the application') do
  @current_page = Features::Pages::Home.new

  @current_page.load
end

Then('I should be on the {string} page') do |page|
  @expected_page = "Features::Pages::#{page}".constantize.new

  expect(@expected_page).to be_displayed
end
