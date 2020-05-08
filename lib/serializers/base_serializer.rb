# frozen_string_literal: true

require 'forwardable'

require 'serializers'

module Serializers
  # Abstract base class for serializing an object to a JSON-compatible hash.
  class BaseSerializer
    def call(object)
      ensure_can_serialize!(object)

      @object = object

      serialize_object(object)
    end
    alias_method :serialize, :call

    private

    attr_reader :object

    def can_serialize?(_object)
      true
    end

    def ensure_can_serialize!(object)
      return if can_serialize?(object)

      raise Serializers::InvalidObjectError,
        Serializers::InvalidObjectError.message(
          object:     object,
          serializer: self
        )
    end

    def serialize_object(object)
      raise Serializers::UndefinedSerializerError,
        Serializers::UndefinedSerializerError.message(object)
    end
  end
end
