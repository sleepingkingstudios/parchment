# frozen_string_literal: true

require_relative '../../items'
require_relative '../../form_helper'

module Features::Pages::Items
  class Form < SitePrism::Section
    include Features::Pages::FormHelper

    TEXT_INPUTS = %i[
      cost
      description
      name
      short_description
    ].freeze

    ALL_INPUTS = [
      *TEXT_INPUTS
    ].freeze

    elements :form_groups, '.form-group'

    element :submit_button, '.item-form-submit'

    private

    def checkbox_inputs
      []
    end

    def input_prefix
      'item'
    end

    def select_inputs
      []
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
