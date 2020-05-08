# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/spells'

module Features::Pages::Spells
  class Index < Features::Pages::Base
    set_url '/spells'

    element :loading_message, '.loading-message-pending'

    elements :table_rows, 'table tbody tr'
  end
end
