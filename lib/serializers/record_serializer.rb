# frozen_string_literal: true

require 'serializers/attributes_serializer'

module Serializers
  # Base class for serializing a record as a JSON-compatible hash.
  class RecordSerializer < Serializers::AttributesSerializer
    attribute :id
  end
end
