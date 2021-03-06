# frozen_string_literal: true

require_relative '../base'
require_relative '../spells'
require_relative './_sections/form'

module Features::Pages::Spells
  class Update < Features::Pages::Base
    set_url '/spells{/spell_id}/update'

    element :loading_message, '.loading-message-pending'

    section :spell_form, Features::Pages::Spells::Form, 'form.spell-form'
  end
end
