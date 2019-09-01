# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PublicationsController do
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

  shared_examples 'should require a valid publication id' do
    describe 'with an invalid publication id' do
      let(:publication_id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { id: publication_id },
          record_class: Publication
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

      it 'should serialize the publications' do
        call_action

        expect(json).to deep_match expected_json
      end

      include_examples 'should respond with JSON content'
    end
  end

  shared_examples 'should require valid publication params' do
    describe 'with missing publication params' do
      let(:expected_error) do
        Errors::InvalidParameters.new(
          errors: [['publication', "can't be blank"]]
        ).as_json
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end
      let(:params) { super().tap { |hsh| hsh.delete :publication } }

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
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

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/publications.json' do
    let(:expected_data) { [] }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'publications' => expected_data
        }
      }
    end

    def call_action
      get '/api/publications.json', headers: headers, params: params
    end

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the publications' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many publications' do
      let(:expected_data) do
        serializer = PublicationSerializer.new

        publications
          .map { |publication| serializer.serialize(publication) }
      end

      it 'should serialize the publications' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'POST /api/publications.json' do
    let(:params)             { super().merge(publication: publication_params) }
    let(:publication_params) { {} }

    def call_action
      post '/api/publications.json', headers: headers, params: params
    end

    include_examples 'should require valid publication params'

    describe 'with invalid attributes' do
      let(:publication_params) do
        {
          name:             nil,
          publication_date: nil,
          publisher_name:   ''
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'name',
                "can't be blank"
              ],
              [
                'publication_date',
                "can't be blank"
              ],
              [
                'publisher_name',
                "can't be blank"
              ]
            ],
            'record_class' => 'Publication'
          },
          'message' => "Publication has validation errors: name can't be" \
                       " blank, publication_date can't be blank," \
                       " publisher_name can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      # rubocop:disable RSpec/MultipleExpectations
      it 'should not create the publication' do
        expect { call_action }.not_to change(Publication, :count)

        query = Publication.where(name: publication_params[:name])

        expect(query.exists?).to be false
      end
      # rubocop:enable RSpec/MultipleExpectations

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:publication_params) do
        {
          name:             'The Complete Flumph',
          publication_date: '1987-10-09',
          publisher_name:   'Wizards of the Coast'
        }
      end
      let(:created_publication) do
        Publication.where(name: 'The Complete Flumph').first
      end
      let(:expected_json) do
        serializer = PublicationSerializer.new

        {
          'ok'   => true,
          'data' => {
            'publication' => serializer.serialize(created_publication)
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should serialize the publication' do
        call_action

        expect(json).to deep_match expected_json
      end

      # rubocop:disable RSpec/ExampleLength
      # rubocop:disable RSpec/MultipleExpectations
      it 'should create the publication' do
        expect { call_action }.to change(Publication, :count).by(1)

        query = Publication.where(name: publication_params[:name])

        expect(query.exists?).to be true

        publication = query.first

        publication_params.each do |attribute, value|
          if attribute == :publication_date
            expect(publication.send attribute).to be == Date.iso8601(value)
          else
            expect(publication.send attribute).to be == value
          end
        end
      end
      # rubocop:enable RSpec/ExampleLength
      # rubocop:enable RSpec/MultipleExpectations

      include_examples 'should respond with JSON content'
    end
  end

  describe 'GET /api/publications/:id.json' do
    include_context 'when there are many publications'

    let(:publication)    { publications.first }
    let(:publication_id) { publication.id }
    let(:expected_json) do
      serializer = PublicationSerializer.new

      {
        'ok'   => true,
        'data' => {
          'publication' => serializer.serialize(publication)
        }
      }
    end

    def call_action
      get "/api/publications/#{publication_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require a valid publication id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the publication' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end

  describe 'PATCH /api/publications/:id.json' do
    include_context 'when there are many publications'

    let(:params)             { super().merge(publication: publication_params) }
    let(:publication)        { publications.first }
    let(:publication_id)     { publication.id }
    let(:publication_params) { {} }

    def call_action
      patch "/api/publications/#{publication_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require a valid publication id'

    include_examples 'should require valid publication params'

    describe 'with invalid attributes' do
      let(:publication_params) do
        {
          name:             nil,
          publication_date: nil,
          publisher_name:   ''
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'name',
                "can't be blank"
              ],
              [
                'publication_date',
                "can't be blank"
              ],
              [
                'publisher_name',
                "can't be blank"
              ]
            ],
            'record_class' => 'Publication'
          },
          'message' => "Publication has validation errors: name can't be" \
                       " blank, publication_date can't be blank," \
                       " publisher_name can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should not update the publication' do
        call_action

        publication = Publication.find(publication_id)

        publication_params.each do |attribute, value|
          expect(publication.send attribute).not_to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:publication_params) do
        {
          name:           'The Complete Flumph',
          publisher_name: 'Paizo'
        }
      end
      let(:params) do
        super().merge(publication: publication_params)
      end
      let(:updated_publication) do
        Publication.where(name: 'The Complete Flumph').first
      end
      let(:expected_json) do
        serializer = PublicationSerializer.new

        {
          'ok'   => true,
          'data' => {
            'publication' => serializer.serialize(updated_publication)
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should serialize the publication' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should update the publication' do
        call_action

        publication = Publication.find(publication_id)

        publication_params.each do |attribute, value|
          expect(publication.send attribute).to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'DELETE /api/publications/:id.json' do
    include_context 'when there are many publications'

    let(:publication)    { publications.first }
    let(:publication_id) { publication.id }
    let(:expected_json) do
      {
        'data' => nil,
        'ok'   => true
      }
    end

    def call_action
      delete "/api/publications/#{publication_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require a valid publication id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the response' do
      call_action

      expect(json).to deep_match expected_json
    end

    # rubocop:disable RSpec/MultipleExpectations
    it 'should destroy the publication' do
      expect { call_action }.to change(Publication, :count).by(-1)

      query = Publication.where(id: publication_id)

      expect(query.exists?).to be false
    end
    # rubocop:enable RSpec/MultipleExpectations

    include_examples 'should respond with JSON content'
  end
end
