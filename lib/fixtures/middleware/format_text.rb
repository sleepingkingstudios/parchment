# frozen_string_literal: true

require 'fixtures/middleware'
require 'operations/middleware'

module Fixtures::Middleware
  # Middleware command to format long-form text from data files.
  class FormatText < Operations::Middleware
    def initialize(property:, **options)
      @property = property

      super(**options)
    end

    attr_reader :property

    private

    def format_text(text)
      return '' if text.nil? || text.empty?

      text.split(/\n\n+/).map { |para| trim_newlines(para) }.join("\n\n")
    end

    def process(next_command, attributes:)
      attributes =
        Array(property).reduce(attributes) do |hsh, property_name|
          old_value = attributes[property_name]
          new_value = format_text(old_value)

          hsh.merge(property_name => new_value)
        end

      super(next_command, attributes: attributes)
    end

    def trim_newlines(paragraph)
      # Unordered list.
      return paragraph.strip if paragraph.start_with?('- ')

      paragraph.gsub(/\s+/, ' ').strip
    end
  end
end
