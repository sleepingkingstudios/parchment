# frozen_string_literal: true

require 'support/pages/base'

module Features::Pages
  class Home < Features::Pages::Base
    set_url '/'

    element :spells_link, 'a.spells-link'
  end
end
