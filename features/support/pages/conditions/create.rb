# frozen_string_literal: true

require_relative '../base'
require_relative '../conditions'
require_relative './_sections/form'

module Features::Pages::Conditions
  class Create < Features::Pages::Base
    set_url '/mechanics/conditions/create'

    section :condition_form,
      Features::Pages::Conditions::Form,
      'form.mechanic-form'
  end
end
