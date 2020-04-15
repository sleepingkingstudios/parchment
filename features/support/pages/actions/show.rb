# frozen_string_literal: true

require 'support/pages/books'

module Features::Pages::Actions
  class Show < SitePrism::Page
    set_url '/mechanics/actions{/action_id}'

    element :action_block, '.mechanic-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".mechanic-block-#{attr_name.tr('_', '-')}"

      action_block.find(class_name).text
    end
  end
end