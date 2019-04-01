# frozen_string_literal: true

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

    def handle_unknown_attribute
      yield
    rescue ActiveModel::UnknownAttributeError => exception
      attribute_name = unknown_attribute_name(exception)

      result.errors = [[attribute_name, 'unknown attribute']]
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

    def validate_attributes(attributes)
      return true if attributes.is_a?(Hash)

      result.errors = [['attributes', 'must be a Hash']]

      false
    end

    def validate_record(record)
      return true if record.is_a?(record_class)

      result.errors = [['record', "must be a #{record_class.name}"]]

      false
    end
  end
end
