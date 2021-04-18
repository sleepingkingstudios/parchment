# frozen_string_literal: true

require 'operations/attributes'

module Operations::Attributes
  # Operation to generate a url-safe slug from a string.
  class GenerateSlug < Cuprum::Operation
    ARTICLES = %w[of on the].freeze

    EXCLUDED_CHARACTERS_PATTERN = /[^a-z0-9]/.freeze
    private_constant :EXCLUDED_CHARACTERS_PATTERN

    private

    def convert_to_words(value)
      return [] if value.empty?

      value
        .strip
        .downcase
        .split(/[\s\-_]+/)
        .map { |word| word.gsub(EXCLUDED_CHARACTERS_PATTERN, '') }
        .reject { |word| word.empty? || ARTICLES.include?(word) }
    end

    def empty_error
      Cuprum::Error.new(message: "Value can't be blank")
    end

    def invalid_error
      Cuprum::Error.new(message: 'Value must contain letters A-Z or digits 0-9')
    end

    def process(value)
      step { validate_value(value) }

      slug = convert_to_words(value).join('-')

      return slug unless slug.empty?

      failure(invalid_error)
    end

    def type_error
      Cuprum::Error.new(message: 'Value must be a String')
    end

    def validate_value(value)
      return failure(empty_error) if value.nil?

      return failure(type_error) unless value.is_a?(String)

      return unless value.empty?

      failure(empty_error)
    end
  end
end
