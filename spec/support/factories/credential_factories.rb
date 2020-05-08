# frozen_string_literal: true

require 'operations/authentication/password/encrypt'

FactoryBot.define do
  factory :credential, class: 'Authentication::Credential' do
    id { SecureRandom.uuid }

    active     { false }
    data       { {} }
    expires_at { 1.day.from_now }

    trait :active do
      active { true }
    end

    trait :expired do
      expires_at { 1.day.ago }
    end

    trait :inactive do
      active { false }
    end

    trait :with_user do
      association :user, factory: :user
    end
  end

  factory :anonymous_credential,
    class:  'Authentication::AnonymousCredential',
    parent: :credential \
  do
    user { Authentication::User.anonymous }
  end

  factory :password_credential,
    class:  'Authentication::PasswordCredential',
    parent: :credential \
  do
    transient do
      password { 'password' }
    end

    expires_at { 1.year.from_now }

    encrypted_password do
      operation = Operations::Authentication::Password::Encrypt.new

      operation.call(password).value
    end
  end
end
