# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/generate_token'

RSpec.describe Api::BaseController do
  include ActiveSupport::Testing::TimeHelpers

  subject(:controller) { described_class.new }

  describe '#current_session' do
    include_examples 'should have private reader', :current_session, nil
  end

  describe '#deserialize_session' do
    shared_examples 'should set the current session to an anonymous session' do
      it 'should set the current session' do
        expect { controller.send :deserialize_session }
          .to change(controller, :current_session)
          .to be_a Authorization::Session
      end

      it { expect(session.anonymous?).to be true }

      it 'should set an anonymous credential' do
        expect(session.credential).to be_a Authentication::AnonymousCredential
      end

      it 'should set the session expiration' do
        freeze_time do
          expect(session.expires_at).to be == 1.day.from_now
        end
      end
    end

    let(:env)     { {} }
    let(:request) { ActionDispatch::Request.new(env) }
    let(:session) do
      controller
        .tap { controller.send(:deserialize_session) }
        .send(:current_session)
    end
    let(:session_key) do
      '30c9fce969afa44170e68b559f365f64e40f962a7f268297435a606e50adf245fdfb' \
      '0de659f63090dbcba7603017d5742a071e6c2cb03d1464348a9d0570420c'
    end

    before(:example) do
      allow(Rails.application.credentials)
        .to receive(:authentication)
        .and_return(session_key: session_key)

      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:request)
        .and_return(request)
    end

    it 'should define the hook' do
      expect(controller)
        .to respond_to(:deserialize_session, true)
        .with(0).arguments
    end

    context 'when there is no Authorization header' do
      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header is malformed' do
      let(:env) { super().merge('HTTP_AUTHORIZATION' => 'xyzzy') }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header has an invalid scheme' do
      let(:token) { 'YWxhbi5icmFkbGV5QGV4YW1wbGUuY29tOnRyb25saXZlcw==' }
      let(:env)   { super().merge('HTTP_AUTHORIZATION' => "Basic #{token}") }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header has an invalid Bearer token' do
      let(:token) { 'a.b.c' }
      let(:env)   { super().merge('HTTP_AUTHORIZATION' => "Bearer #{token}") }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header has an invalid Bearer token' do
      let(:token) { 'a.b.c' }
      let(:env)   { super().merge('HTTP_AUTHORIZATION' => "Bearer #{token}") }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header has an expired Bearer token' do
      let(:credential) do
        FactoryBot.create(:password_credential, :active, :with_user)
      end
      let(:token) do
        session = Authorization::Session.new(
          credential: credential,
          expires_at: 1.hour.ago
        )

        Operations::Authentication::GenerateToken
          .new(session_key: session_key)
          .call(session)
          .value
      end
      let(:env) { super().merge('HTTP_AUTHORIZATION' => "Bearer #{token}") }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization token has an invalid signature' do
      let(:payload) do
        {
          exp: 1.day.from_now.to_i,
          iat: Time.current.to_i,
          sub: '00000000-0000-0000-0000-000000000000'
        }
      end
      let(:token) do
        JWT.encode(payload, 's3cr3t', 'HS256')
      end
      let(:env) { super().merge('HTTP_AUTHORIZATION' => "Bearer #{token}") }

      include_examples 'should set the current session to an anonymous session'
    end

    context 'when the Authorization header has a valid Bearer token' do
      let(:credential) do
        FactoryBot.create(:password_credential, :active, :with_user)
      end
      let(:token) do
        session = Authorization::Session.new(
          credential: credential,
          expires_at: 12.hours.from_now
        )

        Operations::Authentication::GenerateToken
          .new(session_key: session_key)
          .call(session)
          .value
      end
      let(:env) { super().merge('HTTP_AUTHORIZATION' => "Bearer #{token}") }

      it 'should set the current session' do
        expect { controller.send :deserialize_session }
          .to change(controller, :current_session)
          .to be_a Authorization::Session
      end

      it { expect(session.anonymous?).to be false }

      it 'should set the session credential' do
        expect(session.credential).to be == credential
      end

      it 'should set the session expiration' do
        freeze_time do
          expect(session.expires_at).to be == 12.hours.from_now
        end
      end
    end
  end

  describe '#responder' do
    let(:responder) { controller.send :responder }

    it 'should define the private method' do
      expect(controller).to respond_to(:responder, true).with(0).arguments
    end

    it { expect(responder).to be_a Responders::JsonResponder }

    it { expect(responder.controller).to be controller }
  end

  describe '#session_key' do
    include_examples 'should have private reader', :session_key

    context 'when the session key is undefined' do
      let(:error_message) { 'Session key is undefined' }

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

      it 'should raise an exception' do
        expect { controller.send :session_key }
          .to raise_error(
            described_class::UndefinedSessionKeyError,
            error_message
          )
      end
    end

    context 'when ENV["AUTHENTICATION_SESSION_KEY"] is set' do
      let(:session_key) do
        '48a1b5754895986334ac29a7f3201a6574573a7fc7d10213353be83669aebc544682' \
        'bd2294e2ac7b00be5d099190ea9822f7ef9cd1a54c2646450d5b580a7444'
      end

      around(:example) do |example|
        previous_key = ENV['AUTHENTICATION_SESSION_KEY']

        ENV['AUTHENTICATION_SESSION_KEY'] = session_key

        example.call
      ensure
        ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
      end

      it { expect(controller.send :session_key).to be == session_key }
    end

    context 'when credentials.authentication[:session_key] is set' do
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

      it { expect(controller.send :session_key).to be == session_key }
    end
  end
end
