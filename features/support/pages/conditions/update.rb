# frozen_string_literal: true

require_relative '../base'
require_relative '../conditions'
require_relative './_sections/form'

module Features::Pages::Conditions
  class Update < Features::Pages::Base
    set_url '/mechanics/conditions{/condition_id}/update'

    element :loading_message, '.loading-message-pending'

    section :condition_form,
      Features::Pages::Conditions::Form,
      'form.mechanic-form'
  end
end
