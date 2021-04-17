# frozen_string_literal: true

require_relative '../../base'
require_relative '../magic_items'
require_relative './_sections/form'

module Features::Pages::Items::MagicItems
  class Create < Features::Pages::Base
    set_url '/reference/items/magic-items/create'

    section :magic_item_form,
      Features::Pages::Items::MagicItems::Form,
      'form.magic-item-form'
  end
end
