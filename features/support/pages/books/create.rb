# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/books'

module Features::Pages::Books
  class Create < Features::Pages::Base
    set_url '/books/create'

    section :book_form, Features::Pages::Books::Form, 'form.book-form'
  end
end
