# frozen_string_literal: true

require_relative '../base'
require_relative '../items'

module Features::Pages::Items
  class Index < Features::Pages::Base
    set_url '/reference/items'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.items-table .dynamic-table-empty-message'

    elements :table_rows, '.items-table .items-table-row'
  end
end
