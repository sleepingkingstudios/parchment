# frozen_string_literal: true

require 'support/pages/form_helper'

module Features::Pages
  class LoginForm < SitePrism::Section
    include Features::Pages::FormHelper

    TEXT_INPUTS = %i[
      password
      username
    ].freeze

    ALL_INPUTS = [
      *TEXT_INPUTS
    ].freeze

    element :submit_button, '.form-submit'

    private

    def checkbox_inputs
      []
    end

    def input_prefix
      nil
    end

    def select_inputs
      []
    end

    def text_inputs
      TEXT_INPUTS
    end
  end
end
