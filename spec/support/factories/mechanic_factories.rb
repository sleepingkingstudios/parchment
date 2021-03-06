# frozen_string_literal: true

FactoryBot.define do
  factory :mechanic, class: 'Mechanic' do
    id { SecureRandom.uuid }

    sequence(:name) { |index| "Mechanic #{index}" }

    description       { 'Does something, somehow.' }
    short_description { 'Does something.' }
    slug do
      Operations::Attributes::GenerateSlug.new.call(name).value
    end
  end

  factory :action, class: 'Mechanics::Action', parent: :mechanic do
    sequence(:name) { |index| "Action #{index}" }
  end

  factory :condition, class: 'Mechanics::Condition', parent: :mechanic do
    sequence(:name) { |index| "Condition #{index}" }
  end
end
