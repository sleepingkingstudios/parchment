# frozen_string_literal: true

require_relative '../pages'
require_relative './_sections/_login_form'

module Features::Pages
  class Base < SitePrism::Page
    element :body, '.page-body'

    element :current_user, '.page-current-user'

    element :logout_button, 'button.page-current-user-log-out'

    section :login_form, Features::Pages::LoginForm, 'form.login-form'
  end
end
