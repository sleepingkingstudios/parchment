# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller)     { 'client' }
  let(:publication_id) { '00000000-0000-0000-0000-000000000000' }

  describe 'GET /publications' do
    it 'should route to ClientController#index' do
      expect(get: '/publications').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /publications/create' do
    it 'should route to ClientController#index' do
      expect(get: '/publications/create').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /publications/:id' do
    it 'should route to ClientController#index' do
      expect(get: "/publications/#{publication_id}").to route_to(
        controller: controller,
        action:     'index',
        id:         publication_id
      )
    end
  end

  describe 'GET /publications/:id/update' do
    it 'should route to ClientController#index' do
      expect(get: "/publications/#{publication_id}/update").to route_to(
        controller: controller,
        action:     'index',
        id:         publication_id
      )
    end
  end
end
