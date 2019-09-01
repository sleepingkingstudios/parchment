# frozen_string_literal: true

FactoryBot.define do
  factory :publication, class: 'Publication' do
    id { SecureRandom.uuid }

    sequence(:name)  { |index| "Publication #{index}" }
    publication_date { Date.new(1982, 7, 9) }
    publisher_name   { 'Paizo' }

    trait :official do
      publisher_name { 'Wizards of the Coast' }
    end

    trait :playtest do
      playtest { true }
    end
  end
end
