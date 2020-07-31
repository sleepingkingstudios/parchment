# frozen_string_literal: true

require 'operations'

module Operations
  # Mixin to wrap operation steps in an ActiveRecord transaction.
  module Transaction
    private

    def transaction
      result = nil

      ApplicationRecord.transaction do
        result = steps { yield }

        raise ActiveRecord::Rollback unless result.success?
      end

      result
    end
  end
end
