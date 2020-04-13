# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Action < Features::Resources::Mechanic
    def class_name
      'Mechanics::Action'
    end
  end
end
