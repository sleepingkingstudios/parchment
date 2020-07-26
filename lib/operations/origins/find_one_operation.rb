# frozen_string_literal: true

require 'operations/records/find_by_slug_operation'
require 'operations/records/find_one_operation'

module Operations::Origins
  # Queries the database for the record in the given table with the given
  # primary key or slug.
  class FindOneOperation < Operations::Records::FindOneOperation
    UUID_PATTERN = /\A\h{8}-\h{4}-\h{4}-\h{4}-\h{12}\z/.freeze
    private_constant :UUID_PATTERN

    private

    def find_by_slug(slug)
      Operations::Records::FindBySlugOperation.new(record_class).call(slug)
    end

    def process(id, as: :id)
      if id.is_a?(String) && !id.empty? && !uuid?(id)
        step :find_by_slug, id
      else
        super
      end
    end

    def uuid?(str)
      str.match?(UUID_PATTERN)
    end
  end
end
