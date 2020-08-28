# frozen_string_literal: true

require 'operations/attributes/generate_slug'

FactoryBot.define do
  factory :language, class: 'References::Language' do
    id { SecureRandom.uuid }

    transient do
      sequence(:language_index) { |i| i }
    end

    name     { "Language #{language_index}" }
    rarity   { References::Language::Rarity::STANDARD }
    script   { "Script for language #{language_index}" }
    speakers { "Speakers for language #{language_index}" }
    slug     { Operations::Attributes::GenerateSlug.new.call(name).value }

    trait :exotic do
      rarity { References::Language::Rarity::EXOTIC }
    end
  end
end
