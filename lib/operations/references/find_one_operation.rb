# frozen_string_literal: true

require 'operations/associations/assign_has_one_operation'
require 'operations/records/find_one_operation'
require 'operations/references'

module Operations::References
  # Queries the database for the record in the given table with the given
  # primary key and assigns its source association, if any.
  class FindOneOperation < Operations::Records::FindOneOperation
    private

    def assign_source_operation
      @assign_source_operation ||=
        Operations::Associations::AssignHasOneOperation.new(
          record_class,
          association_name: :source
        )
    end

    def process(id, as: :id)
      record = step { super }

      assign_source_operation.call(record)
    end
  end
end
