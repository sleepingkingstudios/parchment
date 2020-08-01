# frozen_string_literal: true

require_relative './base'
require_relative '../pages'

module Features::Pages
  class Home < Features::Pages::Base
    set_url '/'

    element :spells_link, 'a.spells-link'
  end
end
