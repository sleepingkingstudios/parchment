# frozen_string_literal: true

# Namespace for serializers, which convert a record or object to a normalized
# form.
module Serializers
  # Base class for exceptions raised during serialization.
  class SerializerError < StandardError; end

  # Exception to be raised when trying to serialize an object that is not
  # suitable for the current serializer.
  class InvalidObjectError < SerializerError
    MESSAGE_FORMAT = 'Unable to serialize %<object>s with %<serializer>s'
    private_constant :MESSAGE_FORMAT

    class << self
      def message(object:, serializer:)
        format(
          MESSAGE_FORMAT,
          object:     object.inspect,
          serializer: serializer.class.name
        )
      end
    end
  end

  # Exception to be raised when trying to serialize an object that does not have
  # a defined serializer.
  class UndefinedSerializerError < SerializerError
    MESSAGE_FORMAT = 'No serializer defined for %<class_name>s'
    private_constant :MESSAGE_FORMAT

    class << self
      def message(object)
        format(MESSAGE_FORMAT, class_name: class_name(object))
      end

      private

      def class_name(object)
        return object if object.is_a?(String)

        return object.name if object.is_a?(Class)

        object.class.name
      end
    end
  end

  class << self
    def serialize(object)
      serializer_for!(object).call(object)
    end

    def serializer_class_for(object)
      klass = object.is_a?(Class) ? object : object.class

      klass.ancestors.each do |mod|
        return nil if mod == ApplicationRecord
        return nil if mod == Object

        serializer_name = "Serializers::#{mod.name}Serializer"

        next unless Object.const_defined?(serializer_name)

        return Object.const_get(serializer_name)
      end

      nil
    end

    def serializer_class_for!(object)
      serializer_class = serializer_class_for(object)

      return serializer_class if serializer_class

      raise UndefinedSerializerError, UndefinedSerializerError.message(object)
    end

    def serializer_for(object)
      serializer_class = serializer_class_for(object)

      serializer_class ? serializer_class.new : nil
    end

    def serializer_for!(object)
      serializer = serializer_for(object)

      return serializer if serializer

      raise UndefinedSerializerError, UndefinedSerializerError.message(object)
    end
  end

  autoload :PublicationSerializer, 'serializers/publication_serializer'
  autoload :SpellSerializer,       'serializers/spell_serializer'
end
