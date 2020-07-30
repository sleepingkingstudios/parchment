# frozen_string_literal: true

require 'operations/records'
require 'operations/subclass'

module Operations::Records
  # Mixin for defining operation subclasses associated with a record class.
  module Subclass
    include Operations::Subclass

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

    def subclass(record_class, arguments: [], as: nil, keywords: {})
      as ||= ::Operations::Records::Subclass.subclass_name(self, record_class)

      klass = super(
        arguments: [record_class, *arguments],
        as:        as,
        keywords:  keywords
      )

      klass.record_class = record_class

      klass
    end

    protected

    attr_writer :record_class
  end
end
