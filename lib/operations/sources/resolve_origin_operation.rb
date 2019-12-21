# frozen_string_literal: true

require 'operations/associations/resolve_one_polymorphic_operation'
require 'operations/sources'

module Operations::Sources
  # Operation that resolves a source origin instance from an attributes hash,
  # either from an id/type pair or a record.
  class ResolveOriginOperation <
        Operations::Associations::ResolveOnePolymorphicOperation
    def initialize
      super(
        association_name: :origin,
        permitted_types:  Source::ORIGIN_TYPES
      )
    end
  end
end
