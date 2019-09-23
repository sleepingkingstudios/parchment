# frozen_string_literal: true

require 'cuprum/error'

require 'errors'

module Errors
  # Cuprum error for an invalid association argument.
  class InvalidAssociation < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'invalid_association'

    # @param association_name [Object] The name of the association.
    # @param record_class [Class] The class of the expected record.
    def initialize(association_name:, record_class:)
      @association_name = association_name
      @record_class     = record_class

      super(message: generate_message)
    end

    # @return [Object] the name of the association.
    attr_reader :association_name

    # @return [Class] the class of the expected record.
    attr_reader :record_class

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'data'    => {
          'association_name' => association_name.inspect,
          'record_class'     => record_class.name
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
      unless valid_association_name?
        return "#{association_name.inspect} is not a valid association name."
      end

      "#{record_class.name} does not define association" \
      " #{association_name.inspect}"
    end

    def valid_association_name?
      (association_name.is_a?(String) || association_name.is_a?(Symbol)) &&
        association_name.to_s.present?
    end
  end
end
