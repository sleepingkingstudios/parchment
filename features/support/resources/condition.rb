# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Condition < Features::Resources::Mechanic
    def block_attributes
      %w[
        name
        description
        short_description
        type
      ]
    end

    def class_name
      'Mechanics::Condition'
    end

    def invalid_attributes
      super.merge(
        short_description: nil
      )
    end

    def valid_attributes
      super.merge(name: 'Lethargy')
    end
  end
end
