# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/books'

module Features::Pages::Books
  class Index < Features::Pages::Base
    set_url '/books'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.books-table .dynamic-table-empty-message'

    elements :table_rows, '.books-table .books-table-row'
  end
end
