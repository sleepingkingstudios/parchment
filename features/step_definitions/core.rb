# frozen_string_literal: true

require 'fixtures'

def create_page(page)
  page = page.split(' ').map(&:camelize).join('::')

  "Features::Pages::#{page}".constantize.new
end

When('the fixtures are loaded') do
  [Publication, Spell].each { |klass| Fixtures.create(klass) }
end

When('I open the application') do
  @current_page = Features::Pages::Home.new

  @current_page.load
end

When('I visit the {string} page') do |page|
  @current_page = create_page(page)

  @current_page.load
end

When('I click the {string} link') do |link|
  @current_page.find_link(link).click
end

Then('I should be on the {string} page') do |page|
  @expected_page = create_page(page)

  expect(@expected_page).to be_displayed
end
