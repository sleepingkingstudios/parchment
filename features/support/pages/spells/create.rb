# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/spells'

module Features::Pages::Spells
  class Create < Features::Pages::Base
    set_url '/spells/create'

    section :spell_form, Features::Pages::Spells::Form, 'form.spell-form'
  end
end
