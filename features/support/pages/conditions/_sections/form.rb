# frozen_string_literal: true

require_relative '../../conditions'
require_relative '../../form_helper'

module Features::Pages::Conditions
  class Form < SitePrism::Section
    include Features::Pages::FormHelper

    TEXT_INPUTS = %i[
      description
      name
      notes
      short_description
    ].freeze

    ALL_INPUTS = [
      *TEXT_INPUTS
    ].freeze

    elements :form_groups, '.form-group'

    element :submit_button, '.mechanic-form-submit'

    private

    def checkbox_inputs
      []
    end

    def input_prefix
      'mechanic'
    end

    def select_inputs
      []
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
