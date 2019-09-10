# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'errors/invalid_record'
require 'errors/unknown_attributes'
require 'operations/records'
require 'operations/steps'

module Operations::Records
  # Abstract base class for record operations.
  class BaseOperation < Cuprum::Operation
    include Operations::Steps

    class << self
      # Returns a new subclass of the operation that curries the
      #
      # @param record_class [Class] The class of record that the operation's
      #   business logic operates on.
      def subclass(record_class)
        Class.new(self).tap do |klass|
          klass.define_method(:initialize) { super(record_class) }

          name = subclass_name(record_class)
          klass.define_singleton_method(:name) { name }
        end
      end

      private

      def subclass_name(record_class)
        *segments, final = name.split('::')

        segments <<
          "#{final.sub(/Operation\z/, '')}#{record_class.name}Operation"

        segments.join('::')
      end
    end

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

      error = Errors::InvalidRecord.new(record_class: record_class)

      failure(error)
    end

    def handle_unknown_attribute
      yield
    rescue ActiveModel::UnknownAttributeError => exception
      error = Errors::UnknownAttributes.new(
        attributes:   [unknown_attribute_name(exception)],
        record_class: record_class
      )

      failure(error)
    end

    def unknown_attribute_name(exception)
      unknown_attribute_pattern.match(exception.message)['attribute_name']
    end

    def unknown_attribute_pattern
      /unknown attribute '(?<attribute_name>.*)'/
    end
  end
end
