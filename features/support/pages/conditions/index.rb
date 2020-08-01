# frozen_string_literal: true

require_relative '../base'
require_relative '../conditions'

module Features::Pages::Conditions
  class Index < Features::Pages::Base
    set_url '/mechanics/conditions'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.conditions-table .dynamic-table-empty-message'

    elements :table_rows, '.conditions-table .conditions-table-row'
  end
end
