# frozen_string_literal: true

require 'operations/applied_middleware'
require 'operations/origins/find_one_operation'
require 'operations/records/middleware/generate_slug'

require 'operations/records/factory'

module Operations::Origins
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
        generate_slug_middleware
      )
    end

    command_class(:find_one) do
      Operations::Origins::FindOneOperation.subclass(record_class)
    end

    command_class(:update) do
      Operations::AppliedMiddleware.subclass(
        Operations::Records::UpdateOperation.subclass(record_class),
        generate_slug_middleware
      )
    end

    private

    def generate_slug_middleware
      @generate_slug_middleware ||=
        Operations::Records::Middleware::GenerateSlug.subclass(
          record_class,
          as: "Operations::Origins::Generate#{record_class}SlugOperation"
        )
    end
  end
end
