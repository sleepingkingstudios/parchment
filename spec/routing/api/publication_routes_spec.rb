# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller)     { 'api/publications' }
  let(:publication_id) { '00000000-0000-0000-0000-000000000000' }

  # rubocop:disable RSpec/ExampleLength
  describe 'GET /api/publications.json' do
    it 'should route to Api::PublicationsController#index' do
      expect(get: '/api/publications.json').to route_to(
        controller: controller,
        action:     'index',
        format:     'json'
      )
    end
  end

  describe 'POST /api/publications.json' do
    it 'should route to Api::PublicationsController#create' do
      expect(post: '/api/publications.json').to route_to(
        controller: controller,
        action:     'create',
        format:     'json'
      )
    end
  end

  describe 'GET /api/publications/:id.json' do
    it 'should route to Api::PublicationsController#show' do
      expect(get: "/api/publications/#{publication_id}.json").to route_to(
        controller: controller,
        action:     'show',
        format:     'json',
        id:         publication_id
      )
    end
  end

  describe 'PATCH /api/publications/:id.json' do
    it 'should route to Api::PublicationsController#update' do
      expect(patch: "/api/publications/#{publication_id}.json").to route_to(
        controller: controller,
        action:     'update',
        format:     'json',
        id:         publication_id
      )
    end
  end

  describe 'DELETE /api/publications/:id.json' do
    it 'should route to Api::PublicationsController#destroy' do
      expect(delete: "/api/publications/#{publication_id}.json").to route_to(
        controller: controller,
        action:     'destroy',
        format:     'json',
        id:         publication_id
      )
    end
  end
  # rubocop:enable RSpec/ExampleLength
end
