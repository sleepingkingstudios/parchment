# frozen_string_literal: true

require_relative '../resources'
require_relative './source'

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

    def invalid_attributes
      super.merge(
        publication_date: '',
        publisher_name:   ''
      )
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

    def valid_attributes
      super.merge(title: 'Blasto the Flumph Spectre')
    end
  end
end
