# frozen_string_literal: true

require_relative '../base'
require_relative '../items'
require_relative './_sections/form'

module Features::Pages::Items
  class Update < Features::Pages::Base
    set_url '/reference/items{/item_id}/update'

    element :loading_message, '.loading-message-pending'

    section :item_form, Features::Pages::Items::Form, 'form.item-form'
  end
end
