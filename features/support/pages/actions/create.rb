# frozen_string_literal: true

require 'support/pages/actions'
require 'support/pages/base'

module Features::Pages::Actions
  class Create < Features::Pages::Base
    set_url '/mechanics/actions/create'

    section :action_form, Features::Pages::Actions::Form, 'form.mechanic-form'
  end
end
