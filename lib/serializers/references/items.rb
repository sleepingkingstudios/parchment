# frozen_string_literal: true

require 'serializers/references'

module Serializers::References
  # Namespace for serializers for item subclasses.
  module Items
    autoload :MagicItemSerializer,
      'serializers/references/items/magic_item_serializer'
  end
end
