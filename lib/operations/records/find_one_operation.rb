# frozen_string_literal: true

require 'errors/not_found'
require 'operations/records/base_operation'
require 'operations/records/parameter_validations'

module Operations::Records
  # Queries the database for the record in the given table with the given
  # primary key.
  class FindOneOperation < Operations::Records::BaseOperation
    include Operations::Records::ParameterValidations::One

    private

    def find_record(id, as:)
      success(record_class.find(id))
    rescue ActiveRecord::RecordNotFound
      error = Errors::NotFound.new(
        attributes:   { as => id },
        record_class: record_class
      )

      failure(error)
    end

    def process(id, as: :id)
      step { handle_invalid_id(id) }

      find_record(id, as: as)
    end
  end
end
