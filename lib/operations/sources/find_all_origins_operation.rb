# frozen_string_literal: true

require 'operations/records/factory'
require 'operations/sources'

module Operations::Sources
  # Queries the database for records representing the origin of domain objects.
  class FindAllOriginsOperation < Cuprum::Operation
    private

    def order_property(origin_type)
      case origin_type
      when 'Book'
        :title
      end
    end

    def process
      Source::ORIGIN_TYPES.each.with_object({}) do |origin_type, hsh|
        origin_key      = origin_type.underscore.pluralize.intern
        origin_class    = origin_type.constantize
        origin_factory  = Operations::Records::Factory.for(origin_class)
        operation       = origin_factory.find_matching
        hsh[origin_key] =
          operation.call(order: order_property(origin_type)).value
      end
    end
  end
end
