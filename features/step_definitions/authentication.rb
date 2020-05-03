# frozen_string_literal: true

def authenticate_user!(with: 'username')
  @current_user, user_data = find_user(role: Authentication::User::Roles::USER)

  @current_page.login_form.fill_attributes(
    username: user_data[with.to_s],
    password: user_data['password']
  )
  @current_page.login_form.submit_button.click

  # TODO: Remove this once a pending overlay is defined.
  expect(@current_page.has_current_user?).to be true
end

def find_user(role:)
  Fixtures.create(Authentication::User) if Authentication::User.count.zero?

  fixtures      = Fixtures.read(Authentication::User, skip_middleware: true)
  user_data     =
    fixtures.find { |user| user['role'] == role }
  user          =
    Authentication::User.where(username: user_data['username']).first

  unless user
    raise "User not found with username #{user_data['username'].inspect}"
  end

  [user, user_data]
end

When('I am not logged in') do
  @current_page.logout_button.click if @current_page.has_logout_button?

  @current_user = nil
end

When('I am logged in as a user') do
  @current_page.logout_button.click if @current_page.has_logout_button?

  authenticate_user!
end

When('I submit the Login form with invalid attributes') do
  login_form = @current_page.login_form

  login_form.fill_attributes(username: 'Sark', password: 'terminate')

  login_form.submit_button.click

  @current_user = nil

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

When('I submit the Login form with a valid email address') do
  authenticate_user!(with: 'email_address')
end

When('I submit the Login form with a valid username') do
  authenticate_user!(with: 'username')
end

When('I log out') do
  expect(@current_page.has_logout_button?).to be true

  @current_page.logout_button.click

  @current_user = nil
end

Then('I should see the Login form') do
  expect(@current_page.has_login_form?).to be true
end

Then('I should not see the Login form') do
  expect(@current_page.has_login_form?).to be false
end
