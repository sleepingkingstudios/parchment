# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'errors/not_found'
require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for the records in the given table with the given
  # primary key.
  class FindOneOperation < Operations::Records::BaseOperation
    private

    def handle_empty_id(id)
      return unless id.empty?

      error = Errors::InvalidParameters.new(
        errors: [['id', "can't be blank"]]
      )

      failure(error)
    end

    def handle_id_type_invalid(id)
      return if id.is_a?(String)

      error = Errors::InvalidParameters.new(
        errors: [['id', 'must be a String']]
      )

      failure(error)
    end

    def handle_nil_id(id)
      return unless id.nil?

      error = Errors::InvalidParameters.new(
        errors: [['id', "can't be blank"]]
      )

      failure(error)
    end

    def find_record(id)
      record_class.find(id)
    rescue ActiveRecord::RecordNotFound
      error = Errors::NotFound.new(
        attributes:   { id: id },
        record_class: record_class
      )

      failure(error)
    end

    def process(id)
      step :handle_nil_id,          id
      step :handle_id_type_invalid, id
      step :handle_empty_id,        id

      find_record(id)
    end
  end
end
