# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/books'

module Features::Pages::Conditions
  class Show < Features::Pages::Base
    set_url '/mechanics/conditions{/condition_id}'

    element :condition_block, '.mechanic-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".mechanic-block-#{attr_name.tr('_', '-')}"

      condition_block.find(class_name).text
    end
  end
end
