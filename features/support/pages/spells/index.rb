# frozen_string_literal: true

require_relative '../base'
require_relative '../spells'

module Features::Pages::Spells
  class Index < Features::Pages::Base
    set_url '/spells'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.spells-table .dynamic-table-empty-message'

    elements :table_rows, '.spells-table .spells-table-row'
  end
end
