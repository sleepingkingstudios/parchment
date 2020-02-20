# frozen_string_literal: true

require 'operations/records/find_many_operation'
require 'operations/references'

module Operations::References
  # Queries the database for the records in the given table with the given
  # primary keys and assigns their source associations, if any.
  class FindManyOperation < Operations::Records::FindManyOperation
    private

    def assign_source_operation
      @assign_source_operation ||=
        Operations::Associations::AssignHasOneOperation.new(
          record_class,
          association_name: :source
        )
    end

    def process(ids, allow_partial: false)
      records = step { super }

      assign_source_operation.call(records)
    end
  end
end
