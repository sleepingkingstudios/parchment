# frozen_string_literal: true

require 'serializers'

module Serializers
  # Namespace for serializers for reference objects.
  module References
    autoload :ItemSerializer,     'serializers/references/item_serializer'
    autoload :LanguageSerializer, 'serializers/references/language_serializer'
    autoload :SkillSerializer,    'serializers/references/skill_serializer'
  end
end
