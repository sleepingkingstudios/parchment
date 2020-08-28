# frozen_string_literal: true

require 'serializers/record_serializer'
require 'serializers/references'

module Serializers::References
  # Serializes a References::Skill as a JSON-compatible hash.
  class SkillSerializer < Serializers::RecordSerializer
    attributes \
      :ability_score,
      :description,
      :name,
      :short_description,
      :slug

    private

    def can_serialize?(object)
      object.is_a?(References::Skill)
    end
  end
end
