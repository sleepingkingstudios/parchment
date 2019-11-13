# frozen_string_literal: true

require 'operations/associations/resolve_one_polymorphic_operation'
require 'operations/sources'

module Operations::Sources
  # Operation that resolves a source reference instance from an attributes hash,
  # either from an id/type pair or a record.
  class ResolveReferenceOperation <
        Operations::Associations::ResolveOnePolymorphicOperation
    def initialize
      super(
        association_name: :reference,
        permitted_types:  Source::REFERENCE_TYPES
      )
    end
  end
end
