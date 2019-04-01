# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for the records in the given table with the given
  # primary key.
  class FindOneOperation < Operations::Records::BaseOperation
    private

    def not_found_error
      [record_class.name.underscore, 'not found']
    end

    def process(id)
      return unless validate_id(id)

      record_class.find(id)
    rescue ActiveRecord::RecordNotFound
      result.errors << not_found_error

      nil
    end

    def validate_id(id)
      validate_id_not_nil(id) &&
        validate_id_type(id) &&
        validate_id_not_empty(id)
    end

    def validate_id_not_empty(id)
      return true unless id.empty?

      result.errors = [['id', "can't be blank"]]

      false
    end

    def validate_id_not_nil(id)
      return true unless id.nil?

      result.errors = [['id', "can't be blank"]]

      false
    end

    def validate_id_type(id)
      return true if id.is_a?(String)

      result.errors = [['id', 'must be a String']]

      false
    end
  end
end
