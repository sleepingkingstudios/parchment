# frozen_string_literal: true

require_relative '../base'
require_relative '../books'
require_relative './_sections/form'

module Features::Pages::Books
  class Create < Features::Pages::Base
    set_url '/books/create'

    section :book_form, Features::Pages::Books::Form, 'form.book-form'
  end
end
