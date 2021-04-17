# frozen_string_literal: true

require_relative '../../../form_helper'
require_relative '../../magic_items'

module Features::Pages::Items::MagicItems
  class Form < SitePrism::Section
    include Features::Pages::FormHelper

    TEXT_INPUTS = %i[
      cost
      description
      name
      short_description
    ].freeze

    SELECT_INPUTS = %i[
      category
      rarity
    ].freeze

    ALL_INPUTS = [
      *SELECT_INPUTS,
      *TEXT_INPUTS
    ].freeze

    elements :form_groups, '.form-group'

    element :submit_button, '.magic-item-form-submit'

    private

    def checkbox_inputs
      []
    end

    def input_prefix
      'magic-item'
    end

    def select_inputs
      SELECT_INPUTS
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
