# frozen_string_literal: true

require_relative '../../base'
require_relative '../magic_items'

module Features::Pages::Items::MagicItems
  class Index < Features::Pages::Base
    set_url '/reference/items/magic-items'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.magic-items-table .dynamic-table-empty-message'

    elements :table_rows, '.magic-items-table .magic-items-table-row'
  end
end
