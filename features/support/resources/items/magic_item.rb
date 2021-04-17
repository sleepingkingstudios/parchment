# frozen_string_literal: true

require_relative '../items'
require_relative '../definition'

module Features::Resources::Items
  class MagicItem < Features::Resources::Definition
    def block_attributes # rubocop:disable Metrics/MethodLength
      %w[
        name
        category
        cost
        data
        description
        rarity
        short_description
        slug
        type
      ]
    end

    def class_name
      'References::Items::MagicItem'
    end

    def fetch_category(magic_item)
      magic_item.category.titleize
    end

    def fetch_data(magic_item)
      magic_item.data.to_json
    end

    def fetch_rarity(magic_item)
      magic_item.rarity.titleize
    end

    def fetch_type(magic_item)
      magic_item.type.split('::').last.titleize
    end

    def invalid_attributes
      super.merge(description: '')
    end

    def table_columns
      @table_columns ||= %w[
        name
        category
        rarity
      ]
    end

    def valid_attributes
      super.merge(name: 'Philter of Filtering')
    end
  end
end
