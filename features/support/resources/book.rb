# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Book < Features::Resources::Source
    def block_attributes
      %w[
        title
        publisher
        publication_date
      ]
    end

    def fetch_publication_date(book)
      book.publication_date.iso8601
    end

    def fetch_publisher(book)
      book.publisher_name
    end

    def primary_attribute
      :title
    end

    def table_columns
      @table_columns ||= %w[
        title
        publisher_name
      ]
    end
  end
end
