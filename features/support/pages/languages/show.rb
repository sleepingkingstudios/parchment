# frozen_string_literal: true

require_relative '../base'
require_relative '../languages'

module Features::Pages::Languages
  class Show < Features::Pages::Base
    set_url '/reference/languages{/language_id}'

    element :dialects_table_empty_message,
      '.language-block-dialects-table .dynamic-table-empty-message'

    elements :dialects_table_rows,
      '.language-block-dialects-table .dynamic-table-row'

    element :language_block, '.language-block'

    element :loading_message, '.loading-message-pending'

    element :parent_language_link, '.language-block-parent-link'

    def find_text(attr_name)
      class_name = ".language-block-#{attr_name.tr('_', '-')}"

      language_block.find(class_name).text
    end
  end
end
