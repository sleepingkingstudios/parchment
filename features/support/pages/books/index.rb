# frozen_string_literal: true

require_relative '../base'
require_relative '../books'

module Features::Pages::Books
  class Index < Features::Pages::Base
    set_url '/books'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.books-table .dynamic-table-empty-message'

    elements :table_rows, '.books-table .books-table-row'
  end
end
