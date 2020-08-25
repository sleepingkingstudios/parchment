# frozen_string_literal: true

require 'operations/attributes/generate_slug'

FactoryBot.define do
  factory :skill, class: 'References::Skill' do
    id { SecureRandom.uuid }

    transient do
      sequence(:skill_index) { |i| i }
    end

    name          { "Skill #{skill_index}" }
    slug          { Operations::Attributes::GenerateSlug.new.call(name).value }
    ability_score { AbilityScores::ALL[skill_index % 6] }
    description   { "The description for skill #{skill_index}." }
  end
end
