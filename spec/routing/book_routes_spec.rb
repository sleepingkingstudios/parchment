# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'client' }
  let(:book_id)    { '00000000-0000-0000-0000-000000000000' }

  describe 'GET /books' do
    it 'should route to ClientController#index' do
      expect(get: '/books').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /books/create' do
    it 'should route to ClientController#index' do
      expect(get: '/books/create').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end

  describe 'GET /books/:id' do
    it 'should route to ClientController#index' do
      expect(get: "/books/#{book_id}").to route_to(
        controller: controller,
        action:     'index',
        id:         book_id
      )
    end
  end

  describe 'GET /books/:id/update' do
    it 'should route to ClientController#index' do
      expect(get: "/books/#{book_id}/update").to route_to(
        controller: controller,
        action:     'index',
        id:         book_id
      )
    end
  end
end
