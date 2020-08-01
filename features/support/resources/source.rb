# frozen_string_literal: true

require_relative '../resources'
require_relative './definition'

module Features::Resources
  class Source < Features::Resources::Definition
    def type
      :source
    end
  end
end
