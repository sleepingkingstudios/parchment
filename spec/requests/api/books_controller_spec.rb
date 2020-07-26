# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::BooksController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  def self.resource_name
    :book
  end

  let(:resource_class) { Book }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/books.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      { 'books' => [] }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/books.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the books' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many resources' do
      let(:book_serializer)  { Serializers::BookSerializer.new }
      let(:serialized_books) do
        books
          .sort_by(&:title)
          .map { |book| book_serializer.serialize(book) }
      end
      let(:expected_data) do
        { 'books' => serialized_books }
      end

      it 'should serialize the books' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'POST /api/books.json' do
    include_context 'with an authorization token for a user'

    let(:params)      { super().merge(book: book_params) }
    let(:book_params) { { title: 'Invoked Apocalypse' } }

    def call_action
      post '/api/books.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require resource params'

    describe 'with invalid attributes' do
      let(:book_params) do
        { title: "The Flumph Fancier's Handbook" }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'publication_date',
                "can't be blank"
              ],
              [
                'publisher_name',
                "can't be blank"
              ]
            ],
            'record_class' => 'Book'
          },
          'message' => "Book has validation errors: publication_date can't be" \
                       " blank, publisher_name can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should not create the book', :aggregate_failures do
        expect { call_action }.not_to change(Book, :count)

        query = Book.where(title: book_params[:title])

        expect(query.exists?).to be false
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:book_params) do
        {
          publication_date: '2013-01-01',
          publisher_name:   'Spelljammer Publishing',
          title:            "The Flumph Fancier's Handbook"
        }
      end
      let(:created_book) do
        Book.where(title: "The Flumph Fancier's Handbook").first
      end
      let(:expected_json) do
        serializer = Serializers::BookSerializer.new

        {
          'ok'   => true,
          'data' => {
            'book' => serializer.serialize(created_book)
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should serialize the book' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should create the book', :aggregate_failures do
        expect { call_action }.to change(Book, :count).by(1)

        query = Book.where(title: book_params[:title])

        expect(query.exists?).to be true

        book = query.first

        book_params.except(:publication_date).each do |attribute, value|
          expect(book.send attribute).to be == value
        end

        expect(book.publication_date)
          .to be == Date.parse(book_params[:publication_date])
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'GET /api/books/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:book)    { books.first }
    let(:book_id) { book.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'book' => Serializers.serialize(book)
        }
      }
    end

    def call_action
      get "/api/books/#{book_id}.json", headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should find the resource by slug'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the book' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end

  describe 'PATCH /api/books/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:params)      { super().merge(book: book_params) }
    let(:book)        { books.first }
    let(:book_id)     { book.id }
    let(:book_params) { { title: "The Flumph Fancier's Handbook" } }

    def call_action
      patch "/api/books/#{book_id}.json", headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should require resource params'

    include_examples 'should find the resource by slug'

    describe 'with invalid attributes' do
      let(:book_params) do
        {
          publication_date: nil,
          publisher_name:   nil,
          title:            "The Flumph Fancier's Handbook"
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'publication_date',
                "can't be blank"
              ],
              [
                'publisher_name',
                "can't be blank"
              ]
            ],
            'record_class' => 'Book'
          },
          'message' => "Book has validation errors: publication_date can't be" \
                       " blank, publisher_name can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should not update the book' do
        call_action

        book = Book.find(book_id)

        book_params.each do |attribute, value|
          expect(book.send attribute).not_to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:book_params) do
        {
          publication_date: '2013-01-01',
          publisher_name:   'Spelljammer Publishing',
          title:            "The Flumph Fancier's Handbook"
        }
      end
      let(:params) { super().merge(book: book_params) }
      let(:updated_book) do
        Book.where(title: "The Flumph Fancier's Handbook").first
      end
      let(:expected_json) do
        serializer = Serializers::BookSerializer.new

        {
          'ok'   => true,
          'data' => {
            'book' => serializer.serialize(updated_book)
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should serialize the book' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should update the book', :aggregate_failures do
        call_action

        book = Book.find(book_id)

        book_params.except(:publication_date).each do |attribute, value|
          expect(book.send attribute).to be == value
        end

        expect(book.publication_date)
          .to be == Date.parse(book_params[:publication_date])
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'DELETE /api/books/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:book)    { books.first }
    let(:book_id) { book.id }
    let(:expected_json) do
      {
        'data' => {},
        'ok'   => true
      }
    end

    def call_action
      delete "/api/books/#{book_id}.json", headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should find the resource by slug'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the response' do
      call_action

      expect(json).to deep_match expected_json
    end

    it 'should destroy the book', :aggregate_failures do
      expect { call_action }.to change(Book, :count).by(-1)

      query = Book.where(id: book_id)

      expect(query.exists?).to be false
    end

    include_examples 'should respond with JSON content'
  end
end
