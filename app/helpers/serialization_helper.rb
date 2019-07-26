# frozen_string_literal: true

# Helper methods for serializing objects.
module SerializationHelper
  def serialize(object, serializer: nil)
    serializer ||= serializer_for(object)
    serializer   = serializer.new if serializer.is_a?(Class)

    return serializer.serialize(object) if serializer

    raise "no serializer defined for #{object.class}"
  end

  private

  def serializer_for(object)
    object.class.ancestors.each do |mod|
      return nil if mod == ApplicationRecord
      return nil if mod == Object

      serializer_name = "#{mod.name}Serializer"

      next unless Object.const_defined?(serializer_name)

      return Object.const_get(serializer_name)
    end

    nil
  end
end
