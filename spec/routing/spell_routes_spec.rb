# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'client' }
  let(:spell_id)   { '00000000-0000-0000-0000-000000000000' }

  describe 'GET /spells' do
    it 'should route to ClientController#index' do
      expect(get: '/spells').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /spells/create' do
    it 'should route to ClientController#index' do
      expect(get: '/spells/create').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /spells/:id' do
    it 'should route to ClientController#index' do
      expect(get: "/spells/#{spell_id}").to route_to(
        controller: controller,
        action:     'index',
        id:         spell_id
      )
    end
  end

  describe 'GET /spells/:id/update' do
    it 'should route to ClientController#index' do
      expect(get: "/spells/#{spell_id}/update").to route_to(
        controller: controller,
        action:     'index',
        id:         spell_id
      )
    end
  end
end
