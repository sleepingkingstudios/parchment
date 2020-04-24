# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/controller_examples'

RSpec.describe Api::Authentication::SessionsController do
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
end
