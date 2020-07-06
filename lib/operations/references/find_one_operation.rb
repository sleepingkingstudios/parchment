# frozen_string_literal: true

require 'operations/associations/assign_has_one_operation'
require 'operations/records/find_one_operation'
require 'operations/references/find_by_slug_operation'

module Operations::References
  # Queries the database for the record in the given table with the given
  # primary key and assigns its source association, if any.
  class FindOneOperation < Operations::Records::FindOneOperation
    UUID_PATTERN = /\A\h{8}-\h{4}-\h{4}-\h{4}-\h{12}\z/.freeze
    private_constant :UUID_PATTERN

    private

    def assign_source_operation
      @assign_source_operation ||=
        Operations::Associations::AssignHasOneOperation.new(
          record_class,
          association_name: :source
        )
    end

    def find_by_slug(slug)
      Operations::References::FindBySlugOperation.new(record_class).call(slug)
    end

    def process(id, as: :id)
      record =
        if id.is_a?(String) && !id.empty? && !uuid?(id)
          step :find_by_slug, id
        else
          step { super }
        end

      assign_source_operation.call(record)
    end

    def uuid?(str)
      str.match?(UUID_PATTERN)
    end
  end
end
