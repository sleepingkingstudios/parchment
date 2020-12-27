# frozen_string_literal: true

require_relative '../base'
require_relative '../items'

module Features::Pages::Items
  class Show < Features::Pages::Base
    set_url '/reference/items{/item_id}'

    element :item_block, '.item-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".item-block-#{attr_name.tr('_', '-')}"

      item_block.find(class_name).text
    end
  end
end
