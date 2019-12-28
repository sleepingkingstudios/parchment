# frozen_string_literal: true

require 'support/pages/form_helper'
require 'support/pages/books'

module Features::Pages::Books
  class Form < SitePrism::Section
    include Features::Pages::FormHelper

    TEXT_INPUTS = %i[
      publication_date
      publisher_name
      slug
      title
    ].freeze

    ALL_INPUTS = [
      *TEXT_INPUTS
    ].freeze

    elements :form_groups, '.form-group'

    element :submit_button, '.book-form-submit'

    private

    def checkbox_inputs
      []
    end

    def input_prefix
      'book'
    end

    def select_inputs
      []
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
