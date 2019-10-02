# frozen_string_literal: true

require 'fixtures/mappings/property_mapping'

module Fixtures::Mappings
  # Mapping that trims newlines within paragraphs.
  class TrimParagraphs < Fixtures::Mappings::PropertyMapping
    private

    def map_property(value:, **_kwargs)
      trim_paragraphs(value)
    end

    def trim_newlines(paragraph)
      # Unordered list.
      return paragraph if paragraph.start_with?('- ')

      paragraph.gsub(/\s+/, ' ')
    end

    def trim_paragraphs(value)
      return '' if value.nil? || value.empty?

      value.split(/\n\n+/).map { |str| trim_newlines(str) }.join("\n\n")
    end
  end
end
