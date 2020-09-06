# frozen_string_literal: true

require_relative '../base'
require_relative '../languages'

module Features::Pages::Languages
  class Index < Features::Pages::Base
    set_url '/reference/languages'

    element :empty_message, '.languages-table .dynamic-table-empty-message'

    element :loading_message, '.loading-message-pending'

    elements :table_rows, '.languages-table .languages-table-row'
  end
end
