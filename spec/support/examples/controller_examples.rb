# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'operations/authentication/generate_token'

require 'support/examples'

module Spec::Support::Examples
  module ControllerExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_context 'when there are many resources' do
      plural_resource_name = resource_name.to_s.pluralize.intern

      let(plural_resource_name) { Fixtures.build(resource_class, count: 3) }

      before(:example) { send(plural_resource_name).each(&:save!) }
    end

    shared_context 'with a missing authorization header' do
      let(:headers) { super().tap { |hsh| hsh.delete('AUTHORIZATION') } }
    end

    shared_context 'with an invalid authorization header' do
      let(:token) { JWT.encode({}, 's3cr3t', 'HS256') }
      let(:headers) do
        super().merge('AUTHORIZATION' => "Bearer #{token}")
      end
    end

    shared_context 'with an authorization token for a user' do
      let(:user) { FactoryBot.create(:user) }
      let(:credential) do
        FactoryBot.create(:password_credential, :active, user: user)
      end
      let(:session) do
        Authorization::Session.new(
          credential: credential,
          expires_at: 1.day.from_now
        )
      end
      let(:session_key) do
        '8587e8f99062cf89caa31c59742ae349e35a9cac7ecb669709f4dc1371a5bd47a759' \
        '4e2dbfd7ed0976f867d7165629f458fbcb18d5a40b32f7675c8f97400613'
      end
      let(:token) do
        ::Operations::Authentication::GenerateToken
          .new(session_key: session_key)
          .call(session)
          .value
      end
      let(:headers) { super().merge('AUTHORIZATION' => "Bearer #{token}") }

      around(:example) do |example|
        previous_key = ENV['AUTHENTICATION_SESSION_KEY']

        ENV['AUTHENTICATION_SESSION_KEY'] = session_key

        example.call
      ensure
        ENV['AUTHENTICATION_SESSION_KEY'] = previous_key
      end
    end

    shared_examples 'should find the resource by slug' do
      describe 'with an invalid slug' do
        let(:"#{resource_name}_id") { 'invalid-slug' }
        let(:expected_error) do
          Errors::NotFound.new(
            attributes:   { slug: send(:"#{resource_name}_id") },
            record_class: resource_class
          )
        end
        let(:expected_json) do
          {
            'error' => expected_error.as_json,
            'ok'    => false
          }
        end

        it 'should respond with 404 Not Found' do
          call_action

          expect(response).to have_http_status(:not_found)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to deep_match expected_json
        end

        include_examples 'should respond with JSON content'
      end

      describe 'with a valid slug' do
        let(:"#{resource_name}_id") { send(resource_name).slug }

        it 'should respond with 200 OK' do
          call_action

          expect(response).to have_http_status(:ok)
        end

        include_examples 'should respond with JSON content'
      end
    end

    shared_examples 'should require an authenticated user' do
      wrap_context 'with a missing authorization header' do
        let(:expected_json) do
          {
            'error' => { 'message' => 'Unable to authenticate user.' },
            'ok'    => false
          }
        end

        it 'should respond with 401 Unauthorized' do
          call_action

          expect(response).to have_http_status(:unauthorized)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to deep_match expected_json
        end

        it 'should respond with the WWW-Authenticate header' do
          call_action

          expect(response.headers['WWW-Authenticate']).to be == 'Bearer'
        end

        include_examples 'should respond with JSON content'
      end

      wrap_context 'with an invalid authorization header' do
        let(:expected_json) do
          {
            'error' => { 'message' => 'Unable to authenticate user.' },
            'ok'    => false
          }
        end

        it 'should respond with 401 Unauthorized' do
          call_action

          expect(response).to have_http_status(:unauthorized)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to deep_match expected_json
        end

        it 'should respond with the WWW-Authenticate header' do
          call_action

          expect(response.headers['WWW-Authenticate']).to be == 'Bearer'
        end

        include_examples 'should respond with JSON content'
      end
    end

    shared_examples 'should require a valid resource id' do
      describe 'with an invalid resource id' do
        let(:"#{resource_name}_id") { '00000000-0000-0000-0000-000000000000' }
        let(:expected_error) do
          Errors::NotFound.new(
            attributes:   { id: send(:"#{resource_name}_id") },
            record_class: resource_class
          )
        end
        let(:expected_json) do
          {
            'error' => expected_error.as_json,
            'ok'    => false
          }
        end

        it 'should respond with 404 Not Found' do
          call_action

          expect(response).to have_http_status(:not_found)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to deep_match expected_json
        end

        include_examples 'should respond with JSON content'
      end
    end

    shared_examples 'should require resource params' do |parameter_name|
      parameter_name ||= resource_name

      describe 'with missing resource params' do
        let(:expected_error) do
          Errors::InvalidParameters.new(
            errors: [[parameter_name.to_s, "can't be blank"]]
          ).as_json
        end
        let(:expected_json) do
          {
            'ok'    => false,
            'error' => expected_error
          }
        end
        let(:params) { super().tap { |hsh| hsh.delete(parameter_name) } }

        it 'should respond with 400 Bad Request' do
          call_action

          expect(response).to have_http_status(:bad_request)
        end

        it 'should serialize the error' do
          call_action

          expect(json).to deep_match expected_json
        end

        include_examples 'should respond with JSON content'
      end
    end

    shared_examples 'should respond with JSON content' do
      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json; charset=utf-8'
      end
    end
  end
end
