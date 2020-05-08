# frozen_string_literal: true

require 'serializers/base_serializer'

module Serializers
  # Serializer class for serializing a string.
  class StringSerializer < Serializers::BaseSerializer
    private

    def can_serialize?(object)
      object.is_a?(String)
    end

    def serialize_object(string)
      string
    end
  end
end
