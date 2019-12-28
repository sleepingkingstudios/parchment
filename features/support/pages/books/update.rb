# frozen_string_literal: true

require 'support/pages/books'

module Features::Pages::Books
  class Update < SitePrism::Page
    set_url '/books{/book_id}/update'

    element :loading_message, '.loading-message-pending'

    section :book_form, Features::Pages::Books::Form, 'form.book-form'
  end
end
