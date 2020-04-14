# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Spell < Features::Resources::Definition
    def block_attributes # rubocop:disable Metrics/MethodLength
      %w[
        name
        casting_time
        components
        description
        duration
        level_school
        range
        short_description
        source
      ]
    end

    def fetch_components(spell)
      ary = []
      ary << 'V' if spell.verbal_component
      ary << 'S' if spell.somatic_component

      unless spell.material_component.blank?
        ary << "M (#{spell.material_component})"
      end

      ary.join ', '
    end

    def fetch_definition(spell)
      spell.definition.gsub(/\n+/, "\n")
    end

    def fetch_level_school(spell)
      str =
        if spell.level.zero?
          "#{spell.school.capitalize} cantrip"
        else
          "#{ordinal(spell.level)}-level #{spell.school}"
        end

      spell.ritual? ? "#{str} (ritual)" : str
    end

    def fetch_school(spell)
      spell.school.capitalize
    end

    def fetch_source(spell)
      spell.source&.name || 'Homebrew'
    end

    def invalid_attributes
      super.merge(range: nil)
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

    def valid_attributes
      super.merge(name: 'Magic Noodle')
    end

    private

    def ordinal(int)
      case int
      when 1
        '1st'
      when 2
        '2nd'
      when 3
        '3rd'
      else
        "#{int}th"
      end
    end
  end
end
