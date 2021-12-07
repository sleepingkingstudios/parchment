# frozen_string_literal: true

require 'cuprum/command'

require 'models/commands/attributes'

module Models::Commands::Attributes
  # Generates a url-friendly slug from an attribute value.
  class GenerateSlug < Cuprum::Command
    EXCLUDED_ARTICLES = %w[a of on the].freeze
    private_constant :EXCLUDED_ARTICLES

    EXCLUDED_CHARACTERS_PATTERN = /[^a-z0-9]+/.freeze
    private_constant :EXCLUDED_CHARACTERS_PATTERN

    private

    def process(value)
      return '' unless value.is_a?(String) || value.is_a?(Symbol)

      return '' if value.empty?

      value
        .to_s
        .strip
        .downcase
        .split(/[\s\-_]+/)
        .map { |word| word.gsub(EXCLUDED_CHARACTERS_PATTERN, '') }
        .reject { |word| word.empty? || EXCLUDED_ARTICLES.include?(word) }
        .join('-')
    end
  end
end
