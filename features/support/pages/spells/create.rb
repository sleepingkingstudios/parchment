# frozen_string_literal: true

require 'support/pages/spells'

module Features::Pages::Spells
  class Create < SitePrism::Page
    set_url '/spells/create'

    section :spell_form, Features::Pages::Spells::Form, 'form.spell-form'
  end
end
