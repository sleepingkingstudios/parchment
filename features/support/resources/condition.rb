# frozen_string_literal: true

require_relative '../resources'
require_relative './mechanic'

module Features::Resources
  class Condition < Features::Resources::Mechanic
    def block_attributes
      %w[
        name
        description
        short_description
        slug
        type
      ]
    end

    def class_name
      'Mechanics::Condition'
    end

    def fetch_description(condition)
      condition
        .description
        .gsub(/[\n\s\-]+/, ' ') # Strip newlines and list dashes.
        .gsub(/[\*_]/, '')      # Strip formatting.
        .strip
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
