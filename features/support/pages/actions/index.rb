# frozen_string_literal: true

require 'support/pages/actions'
require 'support/pages/base'

module Features::Pages::Actions
  class Index < Features::Pages::Base
    set_url '/mechanics/actions'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.actions-table .dynamic-table-empty-message'

    elements :table_rows, '.actions-table .actions-table-row'
  end
end
