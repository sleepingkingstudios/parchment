# frozen_string_literal: true

require_relative '../actions'
require_relative '../base'
require_relative './_sections/form'

module Features::Pages::Actions
  class Update < Features::Pages::Base
    set_url '/mechanics/actions{/action_id}/update'

    element :loading_message, '.loading-message-pending'

    section :action_form, Features::Pages::Actions::Form, 'form.mechanic-form'
  end
end
