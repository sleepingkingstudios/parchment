# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'errors/not_found'
require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for the records in the given table with the given
  # primary keys.
  class FindManyOperation < Operations::Records::BaseOperation
    private

    def handle_empty_id(id, index)
      return unless id.empty?

      error = Errors::InvalidParameters.new(
        errors: [["ids.#{index}", "can't be blank"]]
      )

      failure(error)
    end

    def handle_empty_ids_array(ids)
      return unless ids.empty?

      error = Errors::InvalidParameters.new(
        errors: [['ids', "can't be blank"]]
      )

      failure(error)
    end

    def handle_id_type_invalid(id, index)
      return if id.is_a?(String)

      error = Errors::InvalidParameters.new(
        errors: [["ids.#{index}", 'must be a String']]
      )

      failure(error)
    end

    def handle_ids_array_type_invalid(ids)
      return if ids.is_a?(Array)

      error = Errors::InvalidParameters.new(
        errors: [['ids', 'must be an Array']]
      )

      failure(error)
    end

    def handle_nil_id(id, index)
      return unless id.nil?

      error = Errors::InvalidParameters.new(
        errors: [["ids.#{index}", "can't be blank"]]
      )

      failure(error)
    end

    def handle_nil_ids_array(ids)
      return unless ids.nil?

      error = Errors::InvalidParameters.new(
        errors: [['ids', "can't be blank"]]
      )

      failure(error)
    end

    def find_records(ids, allow_partial:)
      records   = record_class.where(id: ids).to_a
      not_found = ids - records.map(&:id)

      return records if allow_partial || not_found.empty?

      failure(not_found_error(not_found))
    end

    def not_found_error(ids)
      Errors::NotFound.new(
        attributes:   { ids: ids },
        record_class: record_class
      )
    end

    # @param ids [Array] The ids to query.
    # @param allow_partial [Boolean] If false, then the operation will return a
    #   failing result unless records are found for all of the input ids.
    #   Defaults to false.
    def process(ids, allow_partial: false)
      step :handle_nil_ids_array,          ids
      step :handle_ids_array_type_invalid, ids
      step :handle_empty_ids_array,        ids

      ids.each.with_index do |id, index|
        step :handle_nil_id,          id, index
        step :handle_id_type_invalid, id, index
        step :handle_empty_id,        id, index
      end

      find_records(ids, allow_partial: allow_partial)
    end
  end
end
