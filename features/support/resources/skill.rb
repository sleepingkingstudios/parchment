# frozen_string_literal: true

require_relative '../resources'
require_relative './definition'

module Features::Resources
  class Skill < Features::Resources::Definition
    def block_attributes
      %w[
        name
        ability_score
        description
        short_description
        slug
      ]
    end

    def class_name
      'References::Skill'
    end

    def fetch_ability_score(skill)
      skill.ability_score.capitalize
    end

    def invalid_attributes
      super.merge(description: '')
    end

    def table_columns
      @table_columns ||= %w[
        name
        ability_score
        short_description
      ]
    end

    def valid_attributes
      super.merge(title: 'Disco')
    end
  end
end
