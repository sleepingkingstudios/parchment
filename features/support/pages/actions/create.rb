# frozen_string_literal: true

require_relative '../actions'
require_relative '../base'
require_relative './_sections/form'

module Features::Pages::Actions
  class Create < Features::Pages::Base
    set_url '/mechanics/actions/create'

    section :action_form, Features::Pages::Actions::Form, 'form.mechanic-form'
  end
end
