# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/books'

module Features::Pages::Books
  class Index < Features::Pages::Base
    set_url '/books'

    element :loading_message, '.loading-message-pending'

    element :empty_message, 'table tbody tr'

    elements :table_rows, 'table tbody tr'
  end
end
