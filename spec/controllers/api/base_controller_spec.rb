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

        Operations::Authentication::GenerateToken.new.call(session).value
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

        Operations::Authentication::GenerateToken.new.call(session).value
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
end
