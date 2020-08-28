# frozen_string_literal: true

require_relative '../base'
require_relative '../skills'

module Features::Pages::Skills
  class Index < Features::Pages::Base
    set_url '/reference/skills'

    element :loading_message, '.loading-message-pending'

    element :empty_message, '.skills-table .dynamic-table-empty-message'

    elements :table_rows, '.skills-table .skills-table-row'
  end
end
