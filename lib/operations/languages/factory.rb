# frozen_string_literal: true

require 'operations/associations/middleware/cache_many'
require 'operations/languages'
require 'operations/references/factory'

module Operations::Languages
  # Command factory for generating record operations for languages.
  class Factory < Operations::References::Factory
    def initialize
      super(References::Language)
    end

    command_class(:find_one) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::FindOneOperation.subclass(record_class),
        find_by_slug_middleware,
        assign_source_middleware,
        assign_parent_language_middleware,
        assign_dialects_middleware
      )
    end

    private

    def assign_dialects_middleware
      operation_name =
        "Operations::References::Assign#{record_class}DialectsOperation"

      @assign_dialects_middleware ||=
        Operations::Associations::Middleware::CacheMany.subclass(
          record_class,
          as:       operation_name,
          keywords: { association_name: :dialects }
        )
    end

    def assign_parent_language_middleware
      operation_name =
        "Operations::References::Assign#{record_class}ParentLanguageOperation"

      @assign_parent_language_middleware ||=
        Operations::Associations::Middleware::CacheOne.subclass(
          record_class,
          as:       operation_name,
          keywords: { association_name: :parent_language }
        )
    end
  end
end
