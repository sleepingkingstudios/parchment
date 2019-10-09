# frozen_string_literal: true

require_relative '../../pages'

module Features::Pages::Spells
  class Index < SitePrism::Page
    set_url '/spells'

    element :loading_message, '.loading-message-pending'

    elements :table_rows, 'table tbody tr'
  end
end
