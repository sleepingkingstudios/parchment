# frozen_string_literal: true

require 'cuprum/rails/actions/update'

require 'actions/api/sources/books'
require 'models/commands/attributes/generate_slug'

module Actions::Api::Sources::Books
  class Update < Cuprum::Rails::Actions::Update
    UUID_PATTERN = /\A\h{8}-\h{4}-\h{4}-\h{4}-\h{12}\z/.freeze
    private_constant :UUID_PATTERN

    private

    def find_entity(primary_key:)
      return super if uuid?(primary_key)

      step { collection.find_matching.call { { 'slug' => primary_key } } }.first
    end

    def generate_slug(attributes)
      return success(attributes['slug']) if attributes['slug'].present?

      Models::Commands::Attributes::GenerateSlug.new.call(attributes['title'])
    end

    def update_entity(attributes:)
      if attributes.key?('slug')
        attributes = attributes.merge({
          'slug' => step { generate_slug(attributes) }
        })
      end

      super(attributes: attributes)
    end

    def uuid?(primary_key)
      primary_key.match?(UUID_PATTERN)
    end
  end
end
