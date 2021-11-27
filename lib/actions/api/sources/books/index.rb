# frozen_string_literal: true

require 'cuprum/rails/actions/index'

require 'actions/api/sources/books'

module Actions::Api::Sources::Books
  # Action to find and filter Books.
  class Index < Cuprum::Rails::Actions::Index; end
end
