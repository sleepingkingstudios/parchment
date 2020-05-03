# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/spells'

module Features::Pages::Spells
  class Update < Features::Pages::Base
    set_url '/spells{/spell_id}/update'

    element :loading_message, '.loading-message-pending'

    section :spell_form, Features::Pages::Spells::Form, 'form.spell-form'
  end
end
