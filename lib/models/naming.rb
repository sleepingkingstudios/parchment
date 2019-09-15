# frozen_string_literal: true

require 'forwardable'

require 'models'

module Models
  # Service object that automates generating shortened versions of entity names,
  # such as abbreviations or URL slugs.
  class Naming
    # ActiveRecord hooks to automatically generate values based on record
    # attributes.
    module Hooks
      # rubocop:disable Naming/UncommunicativeMethodParamName
      def generate_abbreviation(attribute_name, as: :abbreviation)
        reader_method = as.intern
        writer_method = :"#{as}="

        before_validation do
          current_value = public_send(reader_method)

          next unless current_value.blank?

          input_value  = public_send(attribute_name)
          output_value = Models::Naming.generate_abbreviation(input_value)

          public_send(writer_method, output_value)
        end
      end

      def generate_slug(attribute_name, as: :slug)
        reader_method = as.intern
        writer_method = :"#{as}="

        before_validation do
          current_value = public_send(reader_method)

          next unless current_value.blank?

          input_value  = public_send(attribute_name)
          output_value = Models::Naming.generate_slug(input_value)

          public_send(writer_method, output_value)
        end
      end
      # rubocop:enable Naming/UncommunicativeMethodParamName
    end

    ARTICLES = %w[of on the].freeze

    DIGITS = '0123456789'
    private_constant :DIGITS

    DIGITS_PATTERN = /\A\d+/.freeze
    private_constant :DIGITS_PATTERN

    EXCLUDED_CHARACTERS_PATTERN = /[^a-z0-9]/.freeze
    private_constant :EXCLUDED_CHARACTERS_PATTERN

    class << self
      extend Forwardable

      def instance
        @instance ||= new
      end

      def_delegators :instance,
        :generate_abbreviation,
        :generate_slug
    end

    def initialize(articles: ARTICLES)
      @articles = articles
    end

    attr_reader :articles

    def generate_abbreviation(value)
      convert_to_words(value)
        .map do |word|
          char = word[0]

          next char unless DIGITS.include?(char)

          DIGITS_PATTERN.match(word)[0]
        end
        .join
    end

    def generate_slug(value)
      convert_to_words(value).join('-')
    end

    private

    def convert_to_words(value)
      return [] if value.blank?

      value
        .strip
        .downcase
        .split(/\s+/)
        .map { |word| word.gsub(EXCLUDED_CHARACTERS_PATTERN, '') }
        .reject { |word| word.blank? || articles.include?(word) }
    end
  end
end
