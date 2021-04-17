# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'
require 'support/examples/controllers/references_examples'

RSpec.describe Api::Reference::Items::MagicItemsController, type: :request do
  include Spec::Support::Examples::ControllerExamples
  include Spec::Support::Examples::Controllers::ReferencesExamples

  shared_context 'when there are many magic items' do
    include_context 'when there are many resources'

    let(:sources) do
      magic_items.sort_by(&:name)[0...-1].map do |magic_item|
        FactoryBot.build(:source, :with_book, reference: magic_item)
      end
    end

    before(:example) { sources.each(&:save!) }
  end

  def self.resource_name
    :magic_item
  end

  let(:resource_class) { References::Items::MagicItem }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/references/items/magic_items.json' do
    let(:magic_items) { [] }
    let(:sources)     { [] }
    let(:expected_magic_items) do
      magic_items.sort_by(&:name)
    end

    def call_action
      get '/api/reference/items/magic_items.json',
        headers: headers,
        params:  params
    end

    include_examples 'should index the resources',
      :magic_items,
      includes: %i[source]
  end

  describe 'POST /api/references/items/magic_items.json' do
    let(:invalid_magic_item_params) do
      {
        'name'   => 'Philter of Filtering',
        'rarity' => References::Items::MagicItem::Rarities::RARE
      }
    end
    let(:invalid_magic_item_errors) do
      [

        [
          'description',
          "can't be blank"
        ],
        [
          'category',
          "can't be blank"
        ]
      ]
    end
    let(:valid_magic_item_params) do
      category = References::Items::MagicItem::Categories::WONDROUS_ITEM

      {
        'name'        => 'Philter of Filtering',
        'category'    => category,
        'description' => 'An enchanted flask that purifies its contents.',
        'rarity'      => References::Items::MagicItem::Rarities::RARE,
        'source'      => {
          'origin_id'   => origin.id,
          'origin_type' => origin.class.name
        }
      }
    end
    let(:created_attributes) { magic_item_params.except('source') }
    let(:origin)             { FactoryBot.build(:book) }

    before(:example) { origin.save! }

    def call_action
      post '/api/reference/items/magic_items.json',
        headers: headers,
        params:  params
    end

    include_examples 'should create the resource', :magic_item

    include_examples 'should create the source', :magic_item
  end

  describe 'GET /api/references/items/magic_items/:id.json' do
    let(:magic_item)    { magic_items.first }
    let(:magic_item_id) { magic_item.id }
    let(:source)        { magic_item.source }

    def call_action
      get "/api/reference/items/magic_items/#{magic_item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should show the resource',
      :magic_item,
      includes: %i[source]
  end

  describe 'PATCH /api/references/items/magic_items/:id.json' do
    let(:magic_item)    { magic_items.first }
    let(:magic_item_id) { magic_item.id }
    let(:invalid_magic_item_params) do
      {
        'description' => '',
        'category'    => nil
      }
    end
    let(:invalid_magic_item_errors) do
      [

        [
          'description',
          "can't be blank"
        ],
        [
          'category',
          "can't be blank"
        ]
      ]
    end
    let(:valid_magic_item_params) do
      {
        'name'   => 'Amber of Embers',
        'source' => {
          'origin_id'   => origin.id,
          'origin_type' => origin.class.name
        }
      }
    end
    let(:updated_attributes) { magic_item_params.except('source') }
    let(:origin)             { FactoryBot.build(:book) }

    before(:example) { origin.save! }

    def call_action
      patch "/api/reference/items/magic_items/#{magic_item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should update the resource', :magic_item

    include_examples 'should update the source', :magic_item
  end

  describe 'DELETE /api/references/items/magic_items/:id.json' do
    let(:magic_item)    { magic_items.first }
    let(:magic_item_id) { magic_item.id }

    def call_action
      delete "/api/reference/items/magic_items/#{magic_item_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should destroy the resource', :magic_item

    include_examples 'should destroy the source', :magic_item
  end
end
