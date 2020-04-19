# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/strategies/token'

RSpec.describe Operations::Authentication::Strategies::Token do
  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    shared_context 'when the session key is set' do
      let(:session_key) do
        '30c9fce969afa44170e68b559f365f64e40f962a7f268297435a606e50adf245fdfb' \
        '0de659f63090dbcba7603017d5742a071e6c2cb03d1464348a9d0570420c'
      end

      before(:example) do
        allow(Rails.application.credentials)
          .to receive(:authentication)
          .and_return(session_key: session_key)
      end
    end

    shared_examples 'should deserialize the session' do
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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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
      include_context 'when the session key is set'

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

    context 'when the session key is undefined' do
      let(:token)          { JWT.encode({}, 'invalid_key', 'HS256') }
      let(:expected_error) { Errors::Authentication::InvalidSessionKey.new }

      before(:example) do
        allow(Rails.application.credentials)
          .to receive(:authentication)
          .and_return(nil)
      end

      around(:example) do |example|
        previous_key = ENV['AUTHENTICATION_SESSION_KEY']

        ENV['AUTHENTICATION_SESSION_KEY'] = nil

        example.call
      ensure
        ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
      end

      it 'should return a failing result' do
        expect(operation.call token)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when credentials.authentication[:session_key] is set' do
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
      let(:session_key) do
        '77a9c65e35e1a1041d0cf9f50407a16ccecf3e040743a12b2fc3b65594885d1413f1' \
        'bbd0578d15aaffabb22c074aabdbb6bc8361f3d5d94149618a715e4d9a89'
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }

      before(:example) do
        allow(Rails.application.credentials)
          .to receive(:authentication)
          .and_return(session_key: session_key)
      end

      include_examples 'should deserialize the session'
    end

    context 'when ENV["AUTHENTICATION_SESSION_KEY"] is set' do
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
      let(:session_key) do
        '48a1b5754895986334ac29a7f3201a6574573a7fc7d10213353be83669aebc544682' \
        'bd2294e2ac7b00be5d099190ea9822f7ef9cd1a54c2646450d5b580a7444'
      end
      let(:token) { JWT.encode(payload, session_key, 'HS256') }

      around(:example) do |example|
        previous_key = ENV['AUTHENTICATION_SESSION_KEY']

        ENV['AUTHENTICATION_SESSION_KEY'] = session_key

        example.call
      ensure
        ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
      end

      include_examples 'should deserialize the session'
    end
  end
end
