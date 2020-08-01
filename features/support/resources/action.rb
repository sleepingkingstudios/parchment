# frozen_string_literal: true

require_relative '../resources'
require_relative './mechanic'

module Features::Resources
  class Action < Features::Resources::Mechanic
    def block_attributes
      %w[
        name
        description
        short_description
        type
      ]
    end

    def class_name
      'Mechanics::Action'
    end

    def invalid_attributes
      super.merge(
        short_description: nil
      )
    end

    def valid_attributes
      super.merge(name: 'Self-Destruct')
    end
  end
end
