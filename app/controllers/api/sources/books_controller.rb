# frozen_string_literal: true

require 'cuprum/rails/actions/index'

require 'serializers/sources/book_serializer'

# Controller for performing CRUD actions on Books via a JSON API.
class Api::Sources::BooksController < ApiController
  def self.resource
    Cuprum::Rails::Resource.new(
      default_order:  :title,
      resource_class: ::Book
    )
  end

  def self.serializers
    super().merge(
      ::Book => Serializers::Sources::BookSerializer
    )
  end

  action :index, Cuprum::Rails::Actions::Index
end
