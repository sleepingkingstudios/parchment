# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::Reference::LanguagesController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  shared_context 'when there are many languages' do
    include_context 'when there are many resources'

    let(:sources) do
      languages.sort_by(&:name)[0...-1].map do |language|
        FactoryBot.build(:source, :with_book, reference: language)
      end
    end

    before(:example) { sources.each(&:save!) }
  end

  def self.resource_name
    :language
  end

  let(:resource_class) { References::Language }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/languages.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      {
        'languages' => [],
        'sources'   => []
      }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/reference/languages.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the languages' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many languages' do
      let(:language_serializer) do
        Serializers::References::LanguageSerializer.new
      end
      let(:source_serializer) { Serializers::SourceSerializer.new }
      let(:serialized_languages) do
        languages
          .sort_by(&:name)
          .map { |language| language_serializer.serialize(language) }
      end
      let(:serialized_sources) do
        sources.map { |source| source_serializer.serialize(source) }
      end
      let(:expected_data) do
        {
          'languages' => serialized_languages,
          'sources'   => serialized_sources
        }
      end

      it 'should serialize the languages' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'GET /api/languages/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many languages'

    let(:language) do
      languages.find { |language| language.parent_language_id.nil? }
    end
    let(:language_id) { language.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'language' => Serializers.serialize(language),
          'source'   => Serializers.serialize(language.source)
        }
      }
    end

    def call_action
      get "/api/reference/languages/#{language_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should find the resource by slug'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the language' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    context 'when the language belongs to a parent' do
      let(:language) do
        languages.find { |language| language.parent_language_id.present? }
      end
      let(:expected_json) do
        {
          'ok'   => true,
          'data' => {
            'language'        => Serializers.serialize(language),
            'parent_language' => Serializers.serialize(
              language.parent_language
            ),
            'source'          => Serializers.serialize(language.source)
          }
        }
      end

      it 'should serialize the language' do
        call_action

        expect(json).to deep_match expected_json
      end
    end

    context 'when the language has dialects' do
      let(:parent_language_id) do
        languages
          .find { |language| language.parent_language_id.present? }
          .parent_language_id
      end
      let(:language) { References::Language.find(parent_language_id) }
      let(:expected_json) do
        {
          'ok'   => true,
          'data' => {
            'dialects' => language.dialects.map do |dialect|
              Serializers.serialize(dialect)
            end,
            'language' => Serializers.serialize(language)
          }
        }
      end

      it 'should serialize the language' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end
end
