# frozen_string_literal: true

require 'support/pages/spells'

module Features::Pages::Spells
  class Show < SitePrism::Page
    set_url '/spells{/spell_id}'

    element :loading_message, '.loading-message-pending'

    element :spell_block, '.spell-block'

    def find_text(attr_name)
      class_name = ".spell-block-#{attr_name.tr('_', '-')}"

      spell_block.find(class_name).text
    end
  end
end
