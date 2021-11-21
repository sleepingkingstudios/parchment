# frozen_string_literal: true

require 'cuprum/rails/serializers/json/attributes_serializer'

require 'serializers/sources'

module Serializers::Sources
  # Serializes Books as JSON.
  class BookSerializer < Cuprum::Rails::Serializers::Json::AttributesSerializer
    attributes \
      :id,
      :abbreviation,
      :publisher_name,
      :slug,
      :title

    attribute :publication_date do |value|
      value&.iso8601
    end
  end
end
