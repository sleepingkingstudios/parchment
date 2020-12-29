# frozen_string_literal: true

require_relative '../base'
require_relative '../items'
require_relative './_sections/form'

module Features::Pages::Items
  class Create < Features::Pages::Base
    set_url '/reference/items/create'

    section :item_form,
      Features::Pages::Items::Form,
      'form.item-form'
  end
end
