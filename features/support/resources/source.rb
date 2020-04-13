# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Source < Features::Resources::Definition
    def type
      :source
    end
  end
end
