# frozen_string_literal: true

require 'support/pages/form_helper'
require 'support/pages/spells'

module Features::Pages::Spells
  class Form < SitePrism::Section
    include Features::Pages::FormHelper

    CHECKBOX_INPUTS = %i[
      somatic_component
      verbal_component
    ].freeze

    SELECT_INPUTS = %i[
      school
    ].freeze

    TEXT_INPUTS = %i[
      casting_time
      description
      duration
      level
      material_component
      name
      range
      short_description
      slug
    ].freeze

    ALL_INPUTS = [
      *CHECKBOX_INPUTS,
      *SELECT_INPUTS,
      *TEXT_INPUTS
    ].freeze

    elements :form_groups, '.form-group'

    element :submit_button, '.spell-form-submit'

    private

    def checkbox_inputs
      CHECKBOX_INPUTS
    end

    def select_inputs
      SELECT_INPUTS
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
