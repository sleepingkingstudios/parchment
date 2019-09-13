# frozen_string_literal: true

require 'serializers/base_serializer'

module Serializers
  # Base class for serializing a record as a JSON-compatible hash.
  class RecordSerializer < Serializers::BaseSerializer
    attribute :id
  end
end
