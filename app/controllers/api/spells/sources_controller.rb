# frozen_string_literal: true

module Api::Spells
  # Controller for requesting Spell sources via a JSON API.
  class SourcesController < Api::ResourcesController
    SOURCE_TYPES = %w[Publication].freeze

    def index
      responder.call(index_sources, action: :index)
    end

    private

    def index_source_type(source_type)
      klass     = source_type.constantize
      factory   = operation_factory_for(klass)
      operation = factory.find_matching

      operation.call(order: { name: :asc })
    end

    def index_sources
      steps do
        SOURCE_TYPES.each.with_object({}) do |source_type, hsh|
          sources = step :index_source_type, source_type
          key     = source_type.split('::').last.underscore.pluralize

          hsh[key] = sources
        end
      end
    end

    def operation_factory_for(klass)
      return klass::Factory if klass.const_defined?(:Factory)

      Operations::Records::Factory.new(klass)
    end
  end
end
