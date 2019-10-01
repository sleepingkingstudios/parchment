# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Spells::SourcesController do
  shared_context 'when there are many publications' do
    let(:publications) { Fixtures.build(Publication, count: 3) }

    before(:each) { publications.each(&:save!) }
  end

  shared_examples 'should respond with JSON content' do
    it 'should respond with JSON content' do
      call_action

      expect(response.content_type).to be == 'application/json; charset=utf-8'
    end
  end

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/spells/sources.json' do
    let(:expected_data) { { 'publications' => [] } }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/spells/sources.json', headers: headers, params: params
    end

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the sources' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many publications' do
      let(:expected_data) do
        serializer = Serializers::PublicationSerializer.new
        serialized =
          publications
          .sort_by(&:name)
          .map { |publication| serializer.serialize(publication) }

        { 'publications' => serialized }
      end

      it 'should serialize the sources' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end
end
