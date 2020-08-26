# frozen_string_literal: true

require 'serializers'

module Serializers
  # Namespace for serializers for reference objects.
  module References
    autoload :SkillSerializer, 'serializers/references/skill_serializer'
  end
end
