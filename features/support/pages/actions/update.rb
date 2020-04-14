# frozen_string_literal: true

require 'support/pages/actions'

module Features::Pages::Actions
  class Update < SitePrism::Page
    set_url '/mechanics/actions{/action_id}/update'

    element :loading_message, '.loading-message-pending'

    section :action_form, Features::Pages::Actions::Form, 'form.mechanic-form'
  end
end
