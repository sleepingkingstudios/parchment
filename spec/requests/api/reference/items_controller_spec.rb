# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::Reference::ItemsController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  shared_context 'when there are many items' do
    include_context 'when there are many resources'

    let(:sources) do
      items.sort_by(&:name)[0...-1].map do |item|
        FactoryBot.build(:source, :with_book, reference: item)
      end
    end

    before(:example) { sources.each(&:save!) }
  end

  def self.resource_name
    :item
  end

  let(:resource_class) { References::Item }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/items.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      {
        'items'   => [],
        'sources' => []
      }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/reference/items.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the skills' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many items' do
      let(:serialized_items) do
        items
          .sort_by(&:name)
          .map { |item| Serializers.serialize(item) }
      end
      let(:serialized_sources) do
        sources.map { |source| Serializers.serialize(source) }
      end
      let(:expected_data) do
        {
          'items'   => serialized_items,
          'sources' => serialized_sources
        }
      end

      it 'should serialize the items' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'GET /api/items/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many items'

    let(:item)    { items.first }
    let(:item_id) { item.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'item'   => Serializers.serialize(item),
          'source' => Serializers.serialize(item.source)
        }
      }
    end

    def call_action
      get "/api/reference/items/#{item_id}.json",
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

    it 'should serialize the item' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end
end
