# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/strategies/token'

RSpec.describe Operations::Authentication::Strategies::Token do
  subject(:operation) { described_class.new(session_key: session_key) }

  let(:session_key) do
    'a8ff7d27b72804395d2f1e2236b5af907f1cc0690b2772e1d57ceab79cfe6d286af9b6e8' \
    'adbe59087516f44e1770beddb449f847fbc51946485771fcfe05bca0'
  end

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:session_key)
    end

    describe 'with session_key: nil' do
      let(:error_message) { "Session key can't be blank" }

      it 'should raise an exception' do
        expect { described_class.new(session_key: nil) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with session_key: an Object' do
      let(:error_message) { 'Session key must be a String' }

      it 'should raise an exception' do
        expect { described_class.new(session_key: Object.new.freeze) }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with session_key: an empty String' do
      let(:error_message) { "Session key can't be blank" }

      it 'should raise an exception' do
        expect { described_class.new(session_key: '') }
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#call' do
    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(1).argument
    end

    describe 'with nil' do
      let(:token) { nil }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      let(:token) { Object.new.freeze }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty String' do
      let(:token) { '' }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a String that is not formatted like a JWT' do
      let(:token) { 'password' }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an invalid JWT' do
      let(:token) { 'a.b.c' }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an unsigned JWT' do
      let(:token) { JWT.encode({}, nil, 'none') }
      let(:expected_error) do
        Errors::Authentication::InvalidToken.new(token: token)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an incorrectly signed JWT' do
      let(:token) { JWT.encode({}, 'invalid_key', 'HS256') }
      let(:expected_error) do
        Errors::Authentication::InvalidSignature.new
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the credential does not exist' do
      let(:credential_id) { '00000000-0000-0000-0000-000000000000' }
      let(:payload) do
        {
          exp: 23.hours.from_now.to_i,
          iat: 1.hour.ago.to_i,
          sub: credential_id
        }
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }
      let(:expected_error) do
        Errors::Authentication::MissingCredential
          .new(credential_id: credential_id)
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the credential is not active' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :inactive,
          :with_user
        )
      end
      let(:payload) do
        {
          exp: 23.hours.from_now.to_i,
          iat: 1.hour.ago.to_i,
          sub: credential.id
        }
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }
      let(:expected_error) do
        Errors::Authentication::InactiveCredential.new
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the credential is expired' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :expired,
          :with_user
        )
      end
      let(:payload) do
        {
          exp: 23.hours.from_now.to_i,
          iat: 1.hour.ago.to_i,
          sub: credential.id
        }
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }
      let(:expected_error) do
        Errors::Authentication::ExpiredCredential.new
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the session is expired' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :with_user
        )
      end
      let(:payload) do
        {
          exp: 1.hour.ago.to_i,
          iat: 25.hours.ago.to_i,
          sub: credential.id
        }
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }
      let(:expected_error) do
        Errors::Authentication::ExpiredSession.new
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the expiration date is missing' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :with_user
        )
      end
      let(:payload) do
        {
          iat: 1.hour.ago.to_i,
          sub: credential.id
        }
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }
      let(:expected_error) do
        Errors::Authentication::ExpiredSession.new
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'with a valid token' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :with_user
        )
      end
      let(:payload) do
        {
          exp: 23.hours.from_now.to_i,
          iat: 1.hour.ago.to_i,
          sub: credential.id
        }
      end
      let(:token)   { JWT.encode(payload, session_key, 'HS256') }
      let(:session) { operation.call(token).value }

      it 'should return a passing result' do
        expect(operation.call(token)).to have_passing_result
      end

      it 'should return an Authorization::Session value' do
        expect(session).to be_a Authorization::Session
      end

      it 'should set the credential' do
        expect(session.credential).to be == credential
      end

      it 'should set the expiration time' do
        expect(session.expires_at.to_i).to be == payload[:exp]
      end
    end
  end
end
