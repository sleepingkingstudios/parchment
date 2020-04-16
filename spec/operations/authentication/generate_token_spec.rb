# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/generate_token'

RSpec.describe Operations::Authentication::GenerateToken do
  include ActiveSupport::Testing::TimeHelpers

  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:expected_error) { Errors::Authentication::InvalidSession.new }

      it 'should return a failing result' do
        expect(operation.call nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      let(:expected_error) { Errors::Authentication::InvalidSession.new }

      it 'should return a failing result' do
        expect(operation.call Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an anonymous Session' do
      let(:session)        { Authorization::AnonymousSession.new }
      let(:expected_error) { Errors::Authentication::AnonymousSession.new }

      it 'should return a failing result' do
        expect(operation.call session)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an expired Session' do
      let(:credential) do
        FactoryBot.create(:password_credential, :active, :with_user)
      end
      let(:session) do
        Authorization::Session.new(
          credential: credential,
          expires_at: 1.day.ago
        )
      end
      let(:expected_error) { Errors::Authentication::ExpiredSession.new }

      it 'should return a failing result' do
        expect(operation.call session)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an invalid Session' do
      let(:credential) do
        FactoryBot.create(:password_credential, :active, :with_user)
      end
      let(:session) do
        Authorization::Session.new(credential: credential)
      end
      let(:expected_error) { Cuprum::Error.new(message: 'Session is invalid') }

      before(:example) do
        allow(session).to receive(:valid?).and_return(false)
      end

      it 'should return a failing result' do
        expect(operation.call session)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a Session with an expired Credential' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :with_user,
          expires_at: 1.day.ago
        )
      end
      let(:session) do
        Authorization::Session.new(credential: credential)
      end
      let(:expected_error) { Errors::Authentication::ExpiredCredential.new }

      it 'should return a failing result' do
        expect(operation.call session)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a Session with an inactive Credential' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :inactive,
          :with_user
        )
      end
      let(:session) do
        Authorization::Session.new(credential: credential)
      end
      let(:expected_error) { Errors::Authentication::InactiveCredential.new }

      it 'should return a failing result' do
        expect(operation.call session)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a valid Session' do
      shared_examples 'should serialize the session as a JWT' do
        let(:token)   { operation.call(session).value }
        let(:decoded) do
          JWT.decode(token, session_key, true, algorithm: 'HS256')
        end
        let(:header)  { decoded[1] }
        let(:payload) { decoded[0] }

        it 'should return a JWT' do
          base64 = '[A-Za-z0-9_\-]+={0,2}'

          expect(token).to be_a(String).and match(
            /\A#{base64}\.#{base64}\.#{base64}\z/
          )
        end

        it 'should serialize the algorithm in the header' do
          expect(header['alg']).to be == 'HS256'
        end

        it 'should set the expiration time' do
          expect(payload['exp']).to be == session.expires_at.to_i
        end

        it 'should set the issued at time' do
          freeze_time do
            expect(payload['iat']).to be == Time.current.to_i
          end
        end

        it 'should set the subject' do
          expect(payload['sub']).to be == credential.id
        end
      end

      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :active,
          :with_user
        )
      end
      let(:session) do
        Authorization::Session.new(credential: credential)
      end

      context 'when the session key is undefined' do
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
          expect(operation.call session)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      context 'when credentials.authentication[:session_key] is set' do
        let(:session_key) do
          '95a5f0d28c65e315747c5485736d023f3fe8bfe490b76326be6af9b09f1af54c17' \
          'ebab5e0456530a0a59ddee2d4cf3ef64dd8fd49bd3a0d9bc663327109413ae'
        end

        before(:example) do
          allow(Rails.application.credentials)
            .to receive(:authentication)
            .and_return(session_key: session_key)
        end

        it 'should return a passing result' do
          expect(operation.call session).to have_passing_result
        end

        include_examples 'should serialize the session as a JWT'
      end

      context 'when ENV["AUTHENTICATION_SESSION_KEY"] is set' do
        let(:session_key) do
          'a8ff7d27b72804395d2f1e2236b5af907f1cc0690b2772e1d57ceab79cfe6d286a' \
          'f9b6e8adbe59087516f44e1770beddb449f847fbc51946485771fcfe05bca0'
        end

        around(:example) do |example|
          previous_key = ENV['AUTHENTICATION_SESSION_KEY']

          ENV['AUTHENTICATION_SESSION_KEY'] = session_key

          example.call
        ensure
          ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
        end

        it 'should return a passing result' do
          expect(operation.call session).to have_passing_result
        end

        include_examples 'should serialize the session as a JWT'
      end
    end
  end
end
