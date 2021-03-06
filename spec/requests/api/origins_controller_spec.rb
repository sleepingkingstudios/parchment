# frozen_string_literal: true

require 'rails_helper'

require 'fixtures'

require 'support/examples/controller_examples'

RSpec.describe Api::OriginsController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  shared_context 'when there are many books' do
    let(:books) { Fixtures.build(Book).sort_by(&:title) }

    before(:example) { books.each(&:save!) }
  end

  shared_context 'when there are many origins' do
    Source::ORIGIN_TYPES.each do |origin_type|
      include_context "when there are many #{origin_type.tableize}"
    end
  end

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/origins.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      Source::ORIGIN_TYPES.each.with_object({}) \
      do |origin_type, hsh|
        hsh[origin_type.tableize] = []
      end
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/origins.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the origins' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    Source::ORIGIN_TYPES.each do |origin_type|
      wrap_context "when there are many #{origin_type.tableize}" do
        let(:expected_data) do
          data = send(origin_type.tableize).map do |item|
            Serializers.serialize(item)
          end

          super().merge(origin_type.tableize => data)
        end

        it 'should serialize the origins' do
          call_action

          expect(json).to deep_match expected_json
        end
      end
    end

    wrap_context 'when there are many origins' do
      let(:expected_data) do
        Source::ORIGIN_TYPES.reduce(super()) do |hsh, origin_type|
          data = send(origin_type.tableize).map do |item|
            Serializers.serialize(item)
          end

          hsh.merge(origin_type.tableize => data)
        end
      end

      it 'should serialize the origins' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end
end
