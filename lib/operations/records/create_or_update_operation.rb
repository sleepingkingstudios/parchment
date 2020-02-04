# frozen_string_literal: true

require 'errors/not_unique'
require 'operations/records/create_operation'
require 'operations/records/find_matching_operation'
require 'operations/records/parameter_validations'
require 'operations/records/update_operation'

module Operations::Records
  # Finds and creates or updates the record with the given attributes.
  class CreateOrUpdateOperation < Operations::Records::BaseOperation
    include Operations::Records::ParameterValidations::One

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize( # rubocop:disable Metrics/MethodLength
      record_class,
      create_operation: nil,
      find_by:          :id,
      find_operation:   nil,
      update_operation: nil
    )
      super(record_class)

      @create_operation =
        create_operation || Operations::Records::CreateOperation
        .new(record_class)
      @find_operation =
        find_operation || Operations::Records::FindMatchingOperation
        .new(record_class)
      @update_operation =
        update_operation || Operations::Records::UpdateOperation
        .new(record_class)

      @query_params = resolve_query_params(find_by)
    end

    private

    attr_reader :create_operation

    attr_reader :find_operation

    attr_reader :query_params

    attr_reader :update_operation

    def build_query(attributes)
      query_params.each.with_object({}) do |attr_name, hsh|
        hsh[attr_name] = fetch_attribute(attributes, attr_name)
      end
    end

    def fetch_attribute(attributes, attr_name)
      attributes.fetch(attr_name.intern, attributes[attr_name.to_s])
    end

    def find_record(query)
      records = step find_operation.call(where: query)

      return records.first unless records.size > 1

      error = Errors::NotUnique.new(
        attributes:   query,
        record_class: record_class,
        records:      records
      )

      failure(error)
    end

    def process(attributes)
      step :validate_primary_key, attributes

      query  = build_query(attributes)
      record = step :find_record, query

      if record
        update_operation.call(record, attributes.except(:id, 'id'))
      else
        create_operation.call(attributes)
      end
    end

    def resolve_query_params(find_by)
      params = Array(find_by)

      raise ArgumentError, "find_by can't be blank" if params.empty?

      if params.any? { |obj| !(obj.is_a?(String) || obj.is_a?(Symbol)) }
        raise ArgumentError,
          'find_by must be an attribute or array of attributes'
      elsif params.any?(&:empty?)
        raise ArgumentError, "find_by can't be blank"
      end

      params.map(&:intern)
    end

    def validate_primary_key(attributes)
      return unless query_params.include?(:id) || query_params.include?('id')

      value = fetch_attribute(attributes, :id)

      step :handle_invalid_id, value
    end
  end
end
