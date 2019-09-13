# frozen_string_literal: true

# Namespace for serializers, which convert a record or object to a normalized
# form.
module Serializers
  class << self
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

        serializer_name = "Serializers::#{mod.name}Serializer"

        next unless Object.const_defined?(serializer_name)

        return Object.const_get(serializer_name)
      end

      nil
    end
  end
end

require 'serializers/base_serializer'

serializers_path = Rails.root.join('lib', 'serializers', '*serializer.rb')

Dir[serializers_path].each { |file| require file }
