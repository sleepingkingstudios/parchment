# frozen_string_literal: true

require 'cuprum/rails/actions/create'

require 'actions/api/sources/books'
require 'models/commands/attributes/generate_slug'

module Actions::Api::Sources::Books
  class Create < Cuprum::Rails::Actions::Create
    def create_resource(resource_params)
      resource_params = resource_params.merge({
        'slug' => step { generate_slug(resource_params) }
      })

      super(resource_params)
    end

    def generate_slug(attributes)
      return success(attributes['slug']) if attributes.key?('slug')

      Models::Commands::Attributes::GenerateSlug.new.call(attributes['title'])
    end
  end
end
