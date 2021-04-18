# frozen_string_literal: true

require 'operations/middleware'
require 'operations/records/subclass'
require 'operations/sources/middleware'
require 'operations/sources/set_source_operation'
require 'operations/transaction'

module Operations::Sources::Middleware
  # Middleware operation for assigning a source to a reference.
  class SetSource < Operations::Middleware
    extend  Operations::Records::Subclass
    include Operations::Transaction

    ORIGIN_KEYS =
      ['origin', 'origin_id', 'origin_type', :origin, :origin_id, :origin_type]
      .freeze
    private_constant :ORIGIN_KEYS

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize(record_class)
      @record_class = record_class
    end

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    private

    def extract_origin_attributes(attributes)
      return [attributes, {}] unless attributes.is_a?(Hash)

      [attributes.except(*ORIGIN_KEYS), attributes.slice(*ORIGIN_KEYS)]
    end

    # rubocop:disable Metrics/MethodLength
    def process(next_command, attributes: {}, **kwargs)
      attributes, origin_attributes = extract_origin_attributes(attributes)

      transaction do
        reference = step do
          super(next_command, attributes: attributes, **kwargs)
        end

        step do
          set_source(
            reference: reference,
            **origin_attributes.symbolize_keys
          )
        end
      end
    end
    # rubocop:enable Metrics/MethodLength

    def set_source(reference:, **kwargs)
      operation = Operations::Sources::SetSourceOperation.new

      operation.call(reference: reference, **kwargs)
    end
  end
end
