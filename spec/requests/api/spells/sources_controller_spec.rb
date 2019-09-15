# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Spells::SourcesController do
  shared_context 'when there are many publications' do
    let(:publications_data) do
      [
        {
          id:               '7edf3a01-da19-475e-8e31-3f40c77acc62',
          name:             "The Flumph Fancier's Handbook",
          publisher_name:   'Wizards of the Coast',
          publication_date: Date.new(1977, 5, 25)
        },
        {
          id:               'cdf0f062-8f68-4b66-9f38-ad1d30f75272',
          name:             'Unearthed Arcana - The Flumph Mage',
          playtest:         true,
          publisher_name:   'Wizards of the Coast',
          publication_date: Date.new(1980, 6, 20)
        },
        {
          id:               '0e25f76d-9d8a-41b1-8b6d-7918a1a1b3f5',
          name:             'Secrets of the Flumph',
          publisher_name:   'Paizo',
          publication_date: Date.new(1983, 5, 25)
        }
      ]
    end
    let!(:publications) do
      publications_data.map { |data| Publication.create!(data) }
    end
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
