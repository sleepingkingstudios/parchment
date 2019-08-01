# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for the records in the given table with the given
  # primary key.
  class FindOneOperation < Operations::Records::BaseOperation
    private

    def handle_id_not_empty(id)
      return unless id.empty?

      failure([['id', "can't be blank"]])
    end

    def handle_id_type_invalid(id)
      return if id.is_a?(String)

      failure([['id', 'must be a String']])
    end

    def handle_invalid_id(id)
      handle_nil_id(id) ||
        handle_id_type_invalid(id) ||
        handle_id_not_empty(id)
    end

    def handle_nil_id(id)
      return unless id.nil?

      failure([['id', "can't be blank"]])
    end

    def find_record(id)
      record_class.find(id)
    rescue ActiveRecord::RecordNotFound
      failure([not_found_error])
    end

    def not_found_error
      [record_class.name.underscore, 'not found']
    end

    def process(id)
      handle_invalid_id(id) || find_record(id)
    end
  end
end
