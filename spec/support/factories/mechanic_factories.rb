# frozen_string_literal: true

FactoryBot.define do
  factory :mechanic, class: 'Mechanic' do
    id { SecureRandom.uuid }

    sequence(:name) { |index| "Mechanic #{index}" }

    description       { 'Does something, somehow.' }
    short_description { 'Does something.' }
  end

  factory :action, class: 'Mechanics::Action', parent: :mechanic do
    sequence(:name) { |index| "Action #{index}" }
  end
end
