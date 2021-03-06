# frozen_string_literal: true

def create_page(page)
  page = page.split(' ').map(&:camelize).join('::')

  "Features::Pages::#{page}".constantize.new
end

When('the fixtures are loaded') do
  Fixtures.create(Authentication::User)

  %i[source resource mechanic].each do |resource_type|
    Features::Resources
      .all
      .select { |defn| defn.type == resource_type }
      .each(&:load_fixtures!)
  end
end

When('I open the application') do
  @current_page = Features::Pages::Home.new

  @current_page.load
end

When('I wait for {int} second') do |duration|
  sleep duration
end

When('I visit the {string} page') do |page|
  @current_page = create_page(page)

  @current_page.load
end

When('I click the {string} button') do |button|
  @current_page.body.find_button(button).click
end

When('I click the {string} link') do |link|
  @current_page.body.find_link(link).click
end

When('I wait for a debugger') do
  byebug # rubocop:disable Lint/Debugger
end

Then('I should be on the {string} page') do |page|
  expected_page = create_page(page)
  @current_page = expected_page

  expect(expected_page).to be_displayed
end
