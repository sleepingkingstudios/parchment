# frozen_string_literal: true

require 'serializers/references/item_serializer'
require 'serializers/references/items'

module Serializers::References::Items
  # Serializes a References::Items::MagicItem as a JSON-compatible hash.
  class MagicItemSerializer < Serializers::References::ItemSerializer
    attributes \
      :category,
      :rarity
  end
end
