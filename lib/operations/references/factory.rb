# frozen_string_literal: true

require 'operations/applied_middleware'
require 'operations/associations/middleware/cache_one'
require 'operations/records/factory'
require 'operations/records/middleware/find_by_slug'
require 'operations/records/middleware/generate_slug'
require 'operations/sources/middleware/set_source'

module Operations::References
  # Command factory for generating record operations for references.
  class Factory < Operations::Records::Factory
    command_class(:assign) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::AssignOperation.subclass(record_class),
        generate_slug_middleware
      )
    end

    command_class(:build) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::BuildOperation.subclass(record_class),
        generate_slug_middleware
      )
    end

    command_class(:create) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::CreateOperation.subclass(record_class),
        generate_slug_middleware,
        set_source_middleware
      )
    end

    command_class(:find_many) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::FindManyOperation.subclass(record_class),
        assign_source_middleware
      )
    end

    command_class(:find_matching) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::FindMatchingOperation.subclass(record_class),
        assign_source_middleware
      )
    end

    command_class(:find_one) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::FindOneOperation.subclass(record_class),
        find_by_slug_middleware,
        assign_source_middleware
      )
    end

    command_class(:update) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::UpdateOperation.subclass(record_class),
        generate_slug_middleware,
        set_source_middleware
      )
    end

    private

    def assign_source_middleware
      operation_name =
        "Operations::References::Assign#{record_class}SourceOperation"

      @assign_source_middleware ||=
        Operations::Associations::Middleware::CacheOne.subclass(
          record_class,
          as:       operation_name,
          keywords: { association_name: :source }
        )
    end

    def find_by_slug_middleware
      @find_by_slug_middleware ||=
        Operations::Records::Middleware::FindBySlug.subclass(
          record_class,
          as: "Operations::References::Find#{record_class}BySlugOperation"
        )
    end

    def generate_slug_middleware
      @generate_slug_middleware ||=
        Operations::Records::Middleware::GenerateSlug.subclass(
          record_class,
          as: "Operations::References::Generate#{record_class}SlugOperation"
        )
    end

    def set_source_middleware
      @set_source_middleware ||=
        Operations::Sources::Middleware::SetSource.subclass(
          record_class,
          as: "Operations::References::Set#{record_class}SourceOperation"
        )
    end
  end
end
