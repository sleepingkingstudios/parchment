# frozen_string_literal: true

require 'cuprum/error'

require 'errors'
require 'serializers'

module Errors
  # Cuprum error for a query that failed to return a unique record.
  class NotUnique < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'not_unique'

    # @param attributes [Hash<String, Object>] The expected attributes.
    # @param record_class [Class] The class of the expected record.
    # @param records [Array] The non-unique returned results.
    def initialize(attributes:, record_class:, records:)
      @attributes   = attributes
      @record_class = record_class
      @records      = records

      super(message: generate_message)
    end

    # @return [Hash<String, Object>] the expected attributes.
    attr_reader :attributes

    # @return [Class] the class of the expected record.
    attr_reader :record_class

    # @return [Class] the non-unique returned results.
    attr_reader :records

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      serialized = records.map { |record| Serializers.serialize(record) }

      {
        'data'    => {
          'attributes'   => attributes.stringify_keys,
          'record_class' => record_class.name,
          'records'      => serialized
        },
        'message' => message,
        'type'    => type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      TYPE
    end

    private

    def generate_message
      "#{record_class.name} not unique with attributes" \
      " #{attributes.map { |k, v| "#{k}: #{v.inspect}" }.join(', ')}" \
      " (found #{records.count} results)"
    end
  end
end
