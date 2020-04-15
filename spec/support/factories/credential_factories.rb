# frozen_string_literal: true

FactoryBot.define do
  factory :credential, class: 'Authentication::Credential' do
    id { SecureRandom.uuid }

    active     { false }
    data       { {} }
    expires_at { 1.day.from_now }

    trait :active do
      active { true }
    end
  end

  factory :password_credential,
    class:  'Authentication::PasswordCredential',
    parent: :credential \
  do
    encrypted_password { 'MTIzNDU=' }
  end
end
