# frozen_string_literal: true

require 'support/pages/spells'

module Features::Pages::Spells
  class Index < SitePrism::Page
    set_url '/spells'

    element :loading_message, '.loading-message-pending'

    elements :table_rows, 'table tbody tr'
  end
end