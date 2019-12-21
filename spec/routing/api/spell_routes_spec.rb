# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'api/spells' }
  let(:spell_id)   { '00000000-0000-0000-0000-000000000000' }

  describe 'GET /api/spells.json' do
    it 'should route to Api::SpellsController#index' do
      expect(get: '/api/spells.json').to route_to(
        controller: controller,
        action:     'index',
        format:     'json'
      )
    end
  end

  describe 'POST /api/spells.json' do
    it 'should route to Api::SpellsController#create' do
      expect(post: '/api/spells.json').to route_to(
        controller: controller,
        action:     'create',
        format:     'json'
      )
    end
  end

  describe 'GET /api/spells/:id.json' do
    it 'should route to Api::SpellsController#show' do
      expect(get: "/api/spells/#{spell_id}.json").to route_to(
        controller: controller,
        action:     'show',
        format:     'json',
        id:         spell_id
      )
    end
  end

  describe 'PATCH /api/spells/:id.json' do
    it 'should route to Api::SpellsController#update' do
      expect(patch: "/api/spells/#{spell_id}.json").to route_to(
        controller: controller,
        action:     'update',
        format:     'json',
        id:         spell_id
      )
    end
  end

  describe 'DELETE /api/spells/:id.json' do
    it 'should route to Api::SpellsController#destroy' do
      expect(delete: "/api/spells/#{spell_id}.json").to route_to(
        controller: controller,
        action:     'destroy',
        format:     'json',
        id:         spell_id
      )
    end
  end
end
