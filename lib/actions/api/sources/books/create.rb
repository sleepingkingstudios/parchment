# frozen_string_literal: true

require 'cuprum/rails/actions/create'

require 'actions/api/sources/books'
require 'models/commands/attributes/generate_slug'

module Actions::Api::Sources::Books
  class Create < Cuprum::Rails::Actions::Create
    private

    def create_entity(attributes:)
      attributes = attributes.merge({
        'slug' => step { generate_slug(attributes) }
      })

      super(attributes: attributes)
    end

    def generate_slug(attributes)
      return success(attributes['slug']) if attributes['slug'].present?

      Models::Commands::Attributes::GenerateSlug.new.call(attributes['title'])
    end
  end
end
