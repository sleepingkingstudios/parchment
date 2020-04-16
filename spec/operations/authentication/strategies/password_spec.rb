# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/strategies/password'

RSpec.describe Operations::Authentication::Strategies::Password do
  include ActiveSupport::Testing::TimeHelpers

  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    shared_examples 'should find the password credential' do
      context 'when the user does not have a password credential' do
        let(:expected_error) do
          Errors::Authentication::UserNotFound.new(username: username)
        end

        it 'should return a failing result' do
          expect(operation.call username: username, password: password)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      context 'when the password credential is expired' do
        let(:expected_error) do
          Errors::Authentication::UserNotFound.new(username: username)
        end
        let(:credential) do
          FactoryBot.build(
            :password_credential,
            :active,
            :expired,
            user:     user,
            password: password
          )
        end

        before(:example) { credential.save! }

        it 'should return a failing result' do
          expect(operation.call username: username, password: password)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      context 'when the password credential is inactive' do
        let(:expected_error) do
          Errors::Authentication::UserNotFound.new(username: username)
        end
        let(:credential) do
          FactoryBot.build(
            :password_credential,
            :inactive,
            user:     user,
            password: password
          )
        end

        before(:example) { credential.save! }

        it 'should return a failing result' do
          expect(operation.call username: username, password: password)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      context 'when the password is invalid' do
        let(:expected_error) do
          Errors::Authentication::UserNotFound.new(username: username)
        end
        let(:credential) do
          FactoryBot.build(
            :password_credential,
            :active,
            user:     user,
            password: '12345'
          )
        end

        before(:example) { credential.save! }

        it 'should return a failing result' do
          expect(operation.call username: username, password: password)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      context 'when the password is valid' do
        let(:credential) do
          FactoryBot.build(
            :password_credential,
            :active,
            user:     user,
            password: password
          )
        end
        let(:session) do
          operation.call(username: username, password: password).value
        end

        before(:example) { credential.save! }

        it 'should return a passing result' do
          expect(operation.call username: username, password: password)
            .to have_passing_result
        end

        it 'should return an authorization session' do
          expect(session).to be_a Authorization::Session
        end

        it 'should return a valid session' do
          expect(session.valid?).to be true
        end

        it 'should return a session with the credential' do
          expect(session.credential).to be == credential
        end

        it 'should return a session that expires in 1 day' do
          freeze_time do
            expect(session.expires_at).to be == 1.day.from_now
          end
        end
      end
    end

    let(:username) { 'alan.bradley@example.com' }
    let(:password) { 'password' }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:password, :username)
    end

    describe 'with password: nil' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call username: username, password: nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with password: an Object' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call username: username, password: Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with password: an empty string' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call username: username, password: '')
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: nil' do
      let(:expected_error) { Errors::Authentication::InvalidUsername.new }

      it 'should return a failing result' do
        expect(operation.call username: nil, password: password)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: an Object' do
      let(:expected_error) { Errors::Authentication::InvalidUsername.new }

      it 'should return a failing result' do
        expect(operation.call username: Object.new.freeze, password: password)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: an empty string' do
      let(:expected_error) { Errors::Authentication::InvalidUsername.new }

      it 'should return a failing result' do
        expect(operation.call username: '', password: password)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: an invalid email address' do
      let(:username) { 'alan.bradley@example.com' }
      let(:expected_error) do
        Errors::Authentication::UserNotFound.new(username: username)
      end

      it 'should return a failing result' do
        expect(operation.call username: username, password: password)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: an invalid username' do
      let(:username) { 'Alan Bradley' }
      let(:expected_error) do
        Errors::Authentication::UserNotFound.new(username: username)
      end

      it 'should return a failing result' do
        expect(operation.call username: username, password: password)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with username: a valid email address' do
      let(:user) do
        FactoryBot.build(
          :user,
          email_address: 'alan.bradley@example.com',
          username:      'Alan Bradley'
        )
      end
      let(:username) { user.email_address }

      before(:example) { user.save! }

      include_examples 'should find the password credential'
    end

    describe 'with username: a valid username' do
      let(:user) do
        FactoryBot.build(
          :user,
          email_address: 'alan.bradley@example.com',
          username:      'Alan Bradley'
        )
      end
      let(:username) { user.username }

      before(:example) { user.save! }

      include_examples 'should find the password credential'
    end
  end
end
