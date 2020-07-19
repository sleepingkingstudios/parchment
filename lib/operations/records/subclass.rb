# frozen_string_literal: true

require 'operations/records'

module Operations::Records
  # Mixin for defining operation subclasses associated with a record class.
  module Subclass
    OPERATION_NAME_PATTERN = /Operation\z/.freeze
    private_constant :OPERATION_NAME_PATTERN

    def self.subclass_name(operation_class, record_class)
      *segments, final = operation_class.name.split('::')

      if final.match?(OPERATION_NAME_PATTERN)
        segments <<
          "#{final.sub(OPERATION_NAME_PATTERN, '')}" \
          "#{record_class.name}Operation"
      else
        segments <<
          "#{final.sub(OPERATION_NAME_PATTERN, '')}#{record_class.name}"
      end

      segments.join('::')
    end

    attr_reader :record_class

    def subclass(record_class, as: nil) # rubocop:disable Metrics/MethodLength
      operation_class = self
      operation_name  = as || ::Operations::Records::Subclass.subclass_name(
        operation_class,
        record_class
      )

      Class.new(self) do
        define_method(:initialize) do |*args|
          super(self.class.record_class, *args)
        end

        define_singleton_method(:inspect) { operation_name }

        define_singleton_method(:name) { operation_name }

        self.record_class = record_class
      end
    end

    protected

    attr_writer :record_class
  end
end
