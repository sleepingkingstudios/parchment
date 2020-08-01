# frozen_string_literal: true

require_relative '../base'
require_relative '../books'

module Features::Pages::Books
  class Show < Features::Pages::Base
    set_url '/books{/book_id}'

    element :book_block, '.book-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".book-block-#{attr_name.tr('_', '-')}"

      book_block.find(class_name).text
    end
  end
end
