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

    alias_method :book, :object

    private

    def can_serialize?(object)
      object.is_a?(Book)
    end
  end
end
