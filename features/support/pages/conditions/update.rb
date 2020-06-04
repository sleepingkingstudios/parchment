# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/conditions'

module Features::Pages::Conditions
  class Update < Features::Pages::Base
    set_url '/mechanics/conditions{/condition_id}/update'

    element :loading_message, '.loading-message-pending'

    section :condition_form,
      Features::Pages::Conditions::Form,
      'form.mechanic-form'
  end
end
