# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'api/books' }
  let(:book_id)    { '00000000-0000-0000-0000-000000000000' }

  describe 'GET /api/books.json' do
    it 'should route to Api::BooksController#index' do
      expect(get: '/api/books.json').to route_to(
        controller: controller,
        action:     'index',
        format:     'json'
      )
    end
  end

  describe 'POST /api/books.json' do
    it 'should route to Api::BooksController#create' do
      expect(post: '/api/books.json').to route_to(
        controller: controller,
        action:     'create',
        format:     'json'
      )
    end
  end

  describe 'GET /api/books/:id.json' do
    it 'should route to Api::BooksController#show' do
      expect(get: "/api/books/#{book_id}.json").to route_to(
        controller: controller,
        action:     'show',
        format:     'json',
        id:         book_id
      )
    end
  end

  describe 'PATCH /api/books/:id.json' do
    it 'should route to Api::BooksController#update' do
      expect(patch: "/api/books/#{book_id}.json").to route_to(
        controller: controller,
        action:     'update',
        format:     'json',
        id:         book_id
      )
    end
  end

  describe 'DELETE /api/books/:id.json' do
    it 'should route to Api::BooksController#destroy' do
      expect(delete: "/api/books/#{book_id}.json").to route_to(
        controller: controller,
        action:     'destroy',
        format:     'json',
        id:         book_id
      )
    end
  end
end
