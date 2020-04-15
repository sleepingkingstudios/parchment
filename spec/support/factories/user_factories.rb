# frozen_string_literal: true

FactoryBot.define do
  factory :user, class: 'Authentication::User' do
    id { SecureRandom.uuid }

    transient do
      sequence(:index)
    end

    email_address { "user.#{index}@example.com" }
    role          { Authentication::User::Roles::USER }
    username      { "User #{index}" }
  end

  factory :admin, parent: :user do
    email_address { "admin.#{index}@example.com" }
    role          { Authentication::User::Roles::ADMIN }
    username      { "Admin #{index}" }
  end
end
