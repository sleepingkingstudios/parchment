# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'operations/records'

module Operations::Records
  # Abstract base class for record operations.
  class BaseOperation < Cuprum::Operation
    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize(record_class)
      @record_class = record_class
    end

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    private

    def handle_invalid_attributes(attributes)
      return if attributes.is_a?(Hash)

      error = Errors::InvalidParameters.new(
        errors: [['attributes', 'must be a Hash']]
      )

      failure(error)
    end

    def handle_invalid_record(record)
      return if record.is_a?(record_class)

      failure([['record', "must be a #{record_class.name}"]])
    end

    def handle_unknown_attribute
      yield
    rescue ActiveModel::UnknownAttributeError => exception
      attribute_name = unknown_attribute_name(exception)

      failure([[attribute_name, 'unknown attribute']])
    end

    def record_errors(record)
      record.errors.entries.map { |(key, message)| [key.to_s, message] }
    end

    def unknown_attribute_name(exception)
      unknown_attribute_pattern.match(exception.message)['attribute_name']
    end

    def unknown_attribute_pattern
      /unknown attribute '(?<attribute_name>.*)'/
    end
  end
end
