# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Spell < Features::Resources::Definition
    def fetch_school(spell)
      spell.school.capitalize
    end

    def fetch_source(spell)
      spell.source&.name || 'Homebrew'
    end

    def table_columns
      @table_columns ||= %w[
        name
        source
        school
        level
        short_description
      ]
    end
  end
end
