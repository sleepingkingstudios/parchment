# frozen_string_literal: true

require 'cuprum/rails/actions/index'

require 'actions/api/sources/books/create'
require 'actions/api/sources/books/destroy'
require 'actions/api/sources/books/show'
require 'actions/api/sources/books/update'
require 'serializers/sources/book_serializer'

# Controller for performing CRUD actions on Books via a JSON API.
class Api::Sources::BooksController < ApiController
  def self.resource
    Cuprum::Rails::Resource.new(
      default_order:        :title,
      permitted_attributes: %w[
        abbreviation
        playtest
        publication_date
        publisher_name
        slug
        title
      ],
      resource_class:       ::Book
    )
  end

  def self.serializers
    super().merge(
      ::Book => Serializers::Sources::BookSerializer
    )
  end

  action :create,  Actions::Api::Sources::Books::Create
  action :destroy, Actions::Api::Sources::Books::Destroy, member: true
  action :index,   Cuprum::Rails::Actions::Index
  action :show,    Actions::Api::Sources::Books::Show,    member: true
  action :update,  Actions::Api::Sources::Books::Update,  member: true
end
