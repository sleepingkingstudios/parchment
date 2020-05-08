# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authorization::AnonymousSession do
  subject(:session) { described_class.new(expires_at: expires_at) }

  let(:expires_at) { nil }

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:expires_at)
    end

    describe 'with expires_at: an Object' do
      let(:error_message) { 'expires_at must be a date or time' }

      it 'should raise an error' do
        expect { described_class.new(expires_at: Object.new.freeze) }
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#active' do
    include_examples 'should have reader', :active, true
  end

  describe '#active?' do
    include_examples 'should have predicate', :active?, true
  end

  describe '#admin?' do
    include_examples 'should have predicate', :admin?, false
  end

  describe '#anonymous?' do
    include_examples 'should have predicate', :anonymous?, true
  end

  describe '#credential' do
    include_examples 'should have reader', :credential

    it 'should return an anonymous credential' do
      expect(session.credential).to be_a(Authentication::AnonymousCredential)
    end

    it 'should return a credential for the anonymous user' do
      expect(session.credential.user).to be == session.user
    end
  end

  describe '#expired?' do
    include_examples 'should have predicate', :expired?, false

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
      -> { session.credential.expires_at }

    context 'when initialized with expires_at: nil' do
      it { expect(session.expires_at).to be == session.credential.expires_at }
    end

    context 'when initialized with expires_at: a time before the credential' do
      let(:expires_at) { 51.weeks.from_now }

      it { expect(session.expires_at).to be == expires_at }
    end

    context 'when initialized with expires_at: a time after the credential' do
      let(:expires_at) { 53.weeks.from_now }

      it { expect(session.expires_at).to be == session.credential.expires_at }
    end
  end

  describe '#role' do
    it { expect(session.role).to be == Authentication::User::Roles::ANONYMOUS }
  end

  describe '#user' do
    include_examples 'should have reader', :user

    it { expect(session.user).to be_a Authentication::User }

    it 'should be an anonymous user' do
      expect(session.user.role).to be == Authentication::User::Roles::ANONYMOUS
    end
  end

  describe '#valid?' do
    it { expect(session).to have_predicate(:valid?).with_value(true) }

    context 'when the session is expired' do
      let(:expires_at) { 1.minute.ago }

      it { expect(session).to have_predicate(:valid?).with_value(false) }
    end
  end
end
