# frozen_string_literal: true

require 'serializers/record_serializer'

module Serializers
  # Serializes a Publication as a JSON-compatible hash.
  class PublicationSerializer < Serializers::RecordSerializer
    attributes \
      :abbreviation,
      :name,
      :official,
      :playtest,
      :publication_date,
      :publisher_name,
      :slug

    alias_method :publication, :object

    def official
      publication.official?
    end

    def publication_date
      super.iso8601
    end

    private

    def can_serialize?(object)
      object.is_a?(Publication)
    end
  end
end
