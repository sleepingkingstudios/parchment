# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authorization::Session do
  subject(:session) do
    described_class.new(
      credential: credential,
      expires_at: expires_at
    )
  end

  let(:expires_at) { nil }
  let(:user)       { FactoryBot.create(:user) }
  let(:credential) do
    FactoryBot.create(:password_credential, :active, user: user)
  end

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:credential, :expires_at)
    end

    describe 'with credential: nil' do
      let(:error_message) { 'credential must be an Authentication::Credential' }

      it 'should raise an error' do
        expect { described_class.new credential: nil }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with credential: an Object' do
      let(:error_message) { 'credential must be an Authentication::Credential' }

      it 'should raise an error' do
        expect { described_class.new credential: Object.new.freeze }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with credential: a non-persisted Credential' do
      let(:credential)    { Authentication::Credential.new }
      let(:error_message) { 'credential must be persisted' }

      it 'should raise an error' do
        expect { described_class.new credential: credential }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with expires_at: an Object' do
      let(:error_message) { 'expires_at must be a date or time' }

      it 'should raise an error' do
        expect do
          described_class.new(
            credential: credential,
            expires_at: Object.new.freeze
          )
        end
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#active' do
    include_examples 'should have reader', :active, true

    context 'with an inactive credential' do
      before(:example) { credential.active = false }

      it { expect(session.active).to be false }
    end
  end

  describe '#active?' do
    include_examples 'should have predicate', :active?, true

    context 'with an inactive credential' do
      before(:example) { credential.active = false }

      it { expect(session.active?).to be false }
    end
  end

  describe '#admin?' do
    include_examples 'should have predicate', :admin?, false

    context 'when the user is an admin user' do
      before(:example) { user.role = Authentication::User::Roles::ADMIN }

      it { expect(session.admin?).to be true }
    end
  end

  describe '#anonymous?' do
    include_examples 'should have predicate', :anonymous?, false

    context 'when the user is an admin user' do
      before(:example) { user.role = Authentication::User::Roles::ADMIN }

      it { expect(session.anonymous?).to be false }
    end
  end

  describe '#credential' do
    include_examples 'should have reader', :credential, -> { credential }
  end

  describe '#expired?' do
    include_examples 'should have predicate', :expired?, false

    context 'when the credential is expired' do
      before(:example) { credential.expires_at = 1.week.ago }

      it { expect(session.expired?).to be true }
    end

    context 'when initialized with expires_at: a time in the past' do
      let(:expires_at) { 1.week.ago }

      it { expect(session.expired?).to be true }
    end

    context 'when initialized with expires_at: a time in the future' do
      let(:expires_at) { 1.week.from_now }

      it { expect(session.expired?).to be false }
    end
  end

  describe '#expires_at' do
    include_examples 'should have reader',
      :expires_at,
      -> { credential.expires_at }

    context 'when initialized with expires_at: nil' do
      it { expect(session.expires_at).to be == credential.expires_at }
    end

    context 'when initialized with expires_at: a time before the credential' do
      let(:expires_at) { credential.expires_at - 1.week }

      it { expect(session.expires_at).to be == expires_at }
    end

    context 'when initialized with expires_at: a time after the credential' do
      let(:expires_at) { credential.expires_at + 1.week }

      it { expect(session.expires_at).to be == credential.expires_at }
    end
  end

  describe '#role' do
    it 'should return the user role' do
      expect(session)
        .to have_reader(:role)
        .with_value(Authentication::User::Roles::USER)
    end

    context 'when the user is an admin' do
      before(:example) { user.role = Authentication::User::Roles::ADMIN }

      it { expect(session.role).to be == Authentication::User::Roles::ADMIN }
    end
  end

  describe '#user' do
    it { expect(session).to have_reader(:user).with_value(user) }
  end

  describe '#valid?' do
    it { expect(session).to have_predicate(:valid?).with_value(true) }

    context 'when the credential is inactive' do
      before(:example) { credential.active = false }

      it { expect(session).to have_predicate(:valid?).with_value(false) }
    end

    context 'when the credential is expired' do
      before(:example) { credential.expires_at = 1.week.ago }

      it { expect(session).to have_predicate(:valid?).with_value(false) }
    end

    context 'when the session is expired' do
      let(:expires_at) { 1.minute.ago }

      it { expect(session).to have_predicate(:valid?).with_value(false) }
    end
  end
end
