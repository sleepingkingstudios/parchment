# frozen_string_literal: true

require 'operations/records/find_matching_operation'
require 'operations/references'

module Operations::References
  # Queries the database for records in the given table matching the specified
  # criteria and assigns their source associations, if any.
  class FindMatchingOperation < Operations::Records::FindMatchingOperation
    private

    def assign_source_operation
      @assign_source_operation ||=
        Operations::Associations::AssignHasOneOperation.new(
          record_class,
          association_name: :source
        )
    end

    def process(order: nil, where: nil)
      records = step { super }

      assign_source_operation.call(records)
    end
  end
end
