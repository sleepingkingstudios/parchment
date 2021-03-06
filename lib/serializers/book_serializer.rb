# frozen_string_literal: true

require 'serializers/record_serializer'

module Serializers
  # Serializes a Book as a JSON-compatible hash.
  class BookSerializer < Serializers::RecordSerializer
    attributes \
      :abbreviation,
      :publication_date,
      :publisher_name,
      :slug,
      :title

    private

    alias_method :book, :object

    def can_serialize?(object)
      object.is_a?(Book)
    end

    def publication_date
      book.publication_date&.iso8601
    end
  end
end
