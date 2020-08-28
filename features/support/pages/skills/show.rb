# frozen_string_literal: true

require_relative '../base'
require_relative '../skills'

module Features::Pages::Skills
  class Show < Features::Pages::Base
    set_url '/reference/skills{/skill_id}'

    element :skill_block, '.skill-block'

    element :loading_message, '.loading-message-pending'

    def find_text(attr_name)
      class_name = ".skill-block-#{attr_name.tr('_', '-')}"

      skill_block.find(class_name).text
    end
  end
end
