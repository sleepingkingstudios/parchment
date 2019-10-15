# frozen_string_literal: true

require 'capybara'
require 'capybara/cucumber'
require 'selenium-webdriver'
require 'site_prism'

Capybara.register_driver :site_prism do |app|
  browser_options = ::Selenium::WebDriver::Chrome::Options.new

  unless ENV['HEADLESS'] == 'false'
    browser_options.args << '--headless'
    browser_options.args << '--disable-gpu'
    browser_options.args << '--no-sandbox'
  end

  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    options: browser_options
  )
end

Capybara.configure do |config|
  config.app_host       = 'http://localhost:5101'
  config.default_driver = :site_prism
end
