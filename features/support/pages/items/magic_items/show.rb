# frozen_string_literal: true

require_relative '../../base'
require_relative '../magic_items'

module Features::Pages::Items::MagicItems
  class Show < Features::Pages::Base
    set_url '/reference/items/magic-items{/magic_item_id}'

    element :magic_item_block, '.magic-item-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".magic-item-block-#{attr_name.tr('_', '-')}"

      magic_item_block.find(class_name).text
    end
  end
end
