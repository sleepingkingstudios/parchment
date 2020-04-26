# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/controller_examples'

RSpec.describe Api::Authentication::SessionsController, type: :request do
  include ActiveSupport::Testing::TimeHelpers
  include Spec::Support::Examples::ControllerExamples

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/authentication/session.json' do
    include_context 'with an authorization token for a user'

    let(:expected_json) do
      {
        'data' => {
          'user' => Serializers.serialize(user)
        },
        'ok'   => true
      }
    end

    def call_action
      get '/api/authentication/session.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the user' do
      call_action

      expect(json).to be == expected_json
    end

    include_examples 'should respond with JSON content'
  end

  describe 'POST /api/authentication/session.json' do
    def call_action
      post '/api/authentication/session.json', headers: headers, params: params
    end

    describe 'with no parameters' do
      let(:message) { Errors::Authentication::InvalidUsername.new.message }
      let(:expected_json) do
        error =
          Errors::InvalidParameters
          .new(errors: [['username', "can't be blank"]])
          .as_json

        {
          'error' => error.as_json,
          'ok'    => false
        }
      end

      it 'should respond with 400 Bad Request' do
        call_action

        expect(response).to have_http_status(:bad_request)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to be == expected_json
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with a missing password' do
      let(:message) { Errors::Authentication::InvalidPassword.new.message }
      let(:expected_json) do
        error =
          Errors::InvalidParameters
          .new(errors: [['password', "can't be blank"]])
          .as_json

        {
          'error' => error.as_json,
          'ok'    => false
        }
      end
      let(:params) { super().merge(username: 'alan.bradley@example.com') }

      it 'should respond with 400 Bad Request' do
        call_action

        expect(response).to have_http_status(:bad_request)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to be == expected_json
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with a missing username' do
      let(:message) { Errors::Authentication::InvalidUsername.new.message }
      let(:expected_json) do
        error =
          Errors::InvalidParameters
          .new(errors: [['username', "can't be blank"]])
          .as_json

        {
          'error' => error.as_json,
          'ok'    => false
        }
      end
      let(:params) { super().merge(password: 'password') }

      it 'should respond with 400 Bad Request' do
        call_action

        expect(response).to have_http_status(:bad_request)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to be == expected_json
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with an invalid username and password' do
      let(:message) { Errors::Authentication::FailedLogin.new.message }
      let(:expected_json) do
        {
          'error' => { 'message' => message },
          'ok'    => false
        }
      end
      let(:params) do
        super().merge(
          password: 'password',
          username: 'alan.bradley@example.com'
        )
      end

      it 'should respond with 403 Forbidden' do
        call_action

        expect(response).to have_http_status(:forbidden)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to be == expected_json
      end

      include_examples 'should respond with JSON content'
    end

    context 'when the user exists' do
      let(:user) do
        FactoryBot.build(
          :user,
          email_address: 'alan.bradley@example.com',
          username:      'Alan Bradley'
        )
      end
      let(:credential) do
        FactoryBot.build(
          :password_credential,
          :active,
          password: 'tr0nl1v3s',
          user:     user
        )
      end

      before(:example) do
        user.save!

        credential.save!
      end

      describe 'with an invalid password' do
        let(:message) { Errors::Authentication::FailedLogin.new.message }
        let(:expected_json) do
          {
            'error' => { 'message' => message },
            'ok'    => false
          }
        end
        let(:params) do
          super().merge(
            password: 'password',
            username: 'alan.bradley@example.com'
          )
        end

        it 'should respond with 403 Forbidden' do
          call_action

          expect(response).to have_http_status(:forbidden)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to be == expected_json
        end

        include_examples 'should respond with JSON content'
      end

      describe 'with a valid password' do
        let(:message) { Errors::Authentication::FailedLogin.new.message }
        let(:session) do
          Authorization::Session.new(
            credential: credential,
            expires_at: 1.day.from_now
          )
        end
        let(:token) do
          Operations::Authentication::GenerateToken
            .new(session_key: session_key)
            .call(session)
            .value
        end
        let(:expected_json) do
          {
            'data' => {
              'token' => token,
              'user'  => Serializers.serialize(user)
            },
            'ok'   => true
          }
        end
        let(:session_key) do
          '7538076ef2d69b202048519a53225278cc7bfda042244455bef5a2ae2ca4454c66' \
          'fd93b63ff45484634b6ef3ad241a0e3b46214e615b8def8de22215a3b0febc'
        end
        let(:params) do
          super().merge(
            password: 'tr0nl1v3s',
            username: 'alan.bradley@example.com'
          )
        end

        around(:example) do |example|
          previous_key = ENV['AUTHENTICATION_SESSION_KEY']

          ENV['AUTHENTICATION_SESSION_KEY'] = session_key

          example.call
        ensure
          ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
        end

        it 'should respond with 201 Created' do
          call_action

          expect(response).to have_http_status(:created)
        end

        it 'should serialize the session' do
          freeze_time do
            call_action

            expect(json).to be == expected_json
          end
        end

        include_examples 'should respond with JSON content'
      end
    end
  end
end
