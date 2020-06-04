# frozen_string_literal: true

require 'support/pages/base'
require 'support/pages/conditions'

module Features::Pages::Conditions
  class Create < Features::Pages::Base
    set_url '/mechanics/conditions/create'

    section :condition_form,
      Features::Pages::Conditions::Form,
      'form.mechanic-form'
  end
end
