# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/actions'

module Features::Pages::Actions
  class Index < Features::Pages::Base
    set_url '/mechanics/actions'

    element :loading_message, '.loading-message-pending'

    elements :table_rows, 'table tbody tr'
  end
end
