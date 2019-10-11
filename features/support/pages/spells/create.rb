# frozen_string_literal: true

require_relative '../../pages'
require_relative './form'

module Features::Pages::Spells
  class Create < SitePrism::Page
    set_url '/spells/create'

    section :spell_form, Features::Pages::Spells::Form, 'form.spell-form'
  end
end
