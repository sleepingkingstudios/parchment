# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'
require 'support/examples/controllers/references_examples'

RSpec.describe Api::Reference::ItemsController, type: :request do
  include Spec::Support::Examples::ControllerExamples
  include Spec::Support::Examples::Controllers::ReferencesExamples

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

  describe 'GET /api/references/items.json' do
    let(:items)   { [] }
    let(:sources) { [] }
    let(:expected_items) do
      items.sort_by(&:name)
    end

    def call_action
      get '/api/reference/items.json', headers: headers, params: params
    end

    include_examples 'should index the resources',
      :items,
      includes: %i[source]
  end

  describe 'POST /api/references/items.json' do
    let(:invalid_item_params) do
      { 'name' => 'The Book of Flumph' }
    end
    let(:invalid_item_errors) do
      [
        [
          'cost',
          "can't be blank"
        ],
        [
          'description',
          "can't be blank"
        ]
      ]
    end
    let(:valid_item_params) do
      {
        'name'        => 'Mummified Flumph Tentacle',
        'cost'        => '1,000 pp',
        'description' => 'A relic of an ancient Flumph saint. Ramen.',
        'source'      => {
          'origin_id'   => origin.id,
          'origin_type' => origin.class.name
        }
      }
    end
    let(:created_attributes) { item_params.except('source') }
    let(:origin)             { FactoryBot.build(:book) }

    before(:example) { origin.save! }

    def call_action
      post '/api/reference/items.json',
        headers: headers,
        params:  params
    end

    include_examples 'should create the resource', :item

    include_examples 'should create the source', :item
  end

  describe 'GET /api/references/items/:id.json' do
    let(:item)    { items.first }
    let(:item_id) { item.id }
    let(:source)  { item.source }

    def call_action
      get "/api/reference/items/#{item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should show the resource',
      :item,
      includes: %i[source]
  end

  describe 'PATCH /api/references/items/:id.json' do
    let(:item)    { items.first }
    let(:item_id) { item.id }
    let(:invalid_item_params) do
      {
        'cost'        => nil,
        'description' => ''
      }
    end
    let(:invalid_item_errors) do
      [
        [
          'cost',
          "can't be blank"
        ],
        [
          'description',
          "can't be blank"
        ]
      ]
    end
    let(:valid_item_params) do
      {
        'name'   => 'Spare Tentacle',
        'source' => {
          'origin_id'   => origin.id,
          'origin_type' => origin.class.name
        }
      }
    end
    let(:updated_attributes) { item_params.except('source') }
    let(:origin)             { FactoryBot.build(:book) }

    before(:example) { origin.save! }

    def call_action
      patch "/api/reference/items/#{item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should update the resource', :item

    include_examples 'should update the source', :item
  end

  describe 'DELETE /api/references/items/:id.json' do
    let(:item)    { items.first }
    let(:item_id) { item.id }

    def call_action
      delete "/api/reference/items/#{item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should destroy the resource', :item

    include_examples 'should destroy the source', :item
  end
end
