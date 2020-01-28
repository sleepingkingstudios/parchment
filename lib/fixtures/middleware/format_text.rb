# frozen_string_literal: true

require 'fixtures/middleware/base'

module Fixtures::Middleware
  # Middleware command to format long-form text from data files.
  class FormatText < Fixtures::Middleware::Base
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

    def process(next_command, data)
      data =
        Array(property).reduce(data) do |hsh, property_name|
          old_value = data[property_name]
          new_value = format_text(old_value)

          hsh.merge(property_name => new_value)
        end

      super(next_command, data)
    end

    def trim_newlines(paragraph)
      # Unordered list.
      return paragraph.strip if paragraph.start_with?('- ')

      paragraph.gsub(/\s+/, ' ').strip
    end
  end
end
