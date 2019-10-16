# frozen_string_literal: true

require 'support/pages'

module Features::Pages
  class Home < SitePrism::Page
    set_url '/'

    element :spells_link, 'a.spells-link'
  end
end