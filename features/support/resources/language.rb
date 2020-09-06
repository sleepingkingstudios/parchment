# frozen_string_literal: true

require_relative '../resources'
require_relative './definition'

module Features::Resources
  class Language < Features::Resources::Definition
    def block_attributes
      %w[
        name
        rarity
        speakers
        script
      ]
    end

    def class_name
      'References::Language'
    end

    def dialects
      Features::Resources::Language.instance
    end

    def fetch_rarity(language)
      language.rarity.capitalize
    end

    def invalid_attributes
      super.merge(rarity: '')
    end

    def parent_language
      Features::Resources::Language.instance
    end

    def parent_language_name(language)
      language.parent_language.name
    end

    def parent_language_url(language)
      "/reference/languages/#{language.parent_language.slug}"
    end

    def table_columns
      @table_columns ||= %w[
        name
        speakers
        rarity
      ]
    end

    def valid_attributes
      super.merge(title: 'Body Language')
    end
  end
end
