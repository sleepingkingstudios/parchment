# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/controller_examples'

RSpec.describe Api::StatusController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/status' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      {
        'postgres' => a_boolean
      }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/status.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the status' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    context 'when the PostgreSQL database is available' do
      let(:expected_data) { super().merge('postgres' => true) }

      before(:example) do
        allow(ActiveRecord::Base).to receive(:connected?).and_return(true)
      end

      it 'should serialize the status' do
        call_action

        expect(json).to deep_match expected_json
      end
    end

    context 'when the PostgreSQL database is unavailable' do
      let(:expected_data) { super().merge('postgres' => false) }

      before(:example) do
        allow(ActiveRecord::Base).to receive(:connected?).and_return(false)
      end

      it 'should serialize the status' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end
end
