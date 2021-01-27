# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

gem 'rails', '~> 6.0.0'

gem 'rack-timeout', '~> 0.6'

gem 'annotate', '~> 2.7', '>= 2.7.4' # https://github.com/ctran/annotate_models
gem 'pg', '>= 0.18', '< 2.0' # Use postgresql as the database for Active Record

# Use Puma as the app server
gem 'puma', '~> 4.3'

# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0.0', '>= 5.0.1'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.1', require: false

gem 'bcrypt', '~> 3.1'
gem 'cuprum', git: 'https://github.com/sleepingkingstudios/cuprum.git'
gem 'jwt', '~> 2.2'

gem 'sleeping_king_studios-tools', '~> 1.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger
  # console.
  gem 'byebug', platforms: %i[mri mingw x64_mingw]

  gem 'factory_bot', '~> 5.0', '~> 5.0.2'
  gem 'factory_bot_rails', '~> 5.0', '~> 5.0.1'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Spring speeds up development by keeping your application running in the
  # background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Run commands to aggregate CI steps, generate templated files, etc.
  gem 'sleeping_king_studios-tasks', '~> 0.4', '>= 0.4.1'
  gem 'thor', '~> 0.20', '>= 0.20.3'

  # Access an interactive console on exception pages or by calling 'console'
  # anywhere in the code.
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'cucumber', '~> 4.1'
  gem 'cucumber-rails', '~> 2.1', require: false
  gem 'database_cleaner', '~> 1.7'
  gem 'selenium-webdriver', '~> 3.142'
  gem 'site_prism', '~> 3.4'
  gem 'webdrivers'

  gem 'rspec', '~> 3.8'
  gem 'rspec-rails', '~> 3.8.2'
  gem 'rspec-sleeping_king_studios',
    git: 'https://github.com/sleepingkingstudios/rspec-sleeping_king_studios'

  gem 'rubocop', '~> 0.66.0'
  gem 'rubocop-rspec', '~> 1.32.0'

  gem 'simplecov', '~> 0.16', '>= 0.16.1'
end
