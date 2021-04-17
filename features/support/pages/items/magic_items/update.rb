# frozen_string_literal: true

require_relative '../../base'
require_relative '../magic_items'
require_relative './_sections/form'

module Features::Pages::Items::MagicItems
  class Update < Features::Pages::Base
    set_url '/reference/items/magic-items{/magic_item_id}/update'

    element :loading_message, '.loading-message-pending'

    section :magic_item_form,
      Features::Pages::Items::MagicItems::Form,
      'form.magic-item-form'
  end
end
