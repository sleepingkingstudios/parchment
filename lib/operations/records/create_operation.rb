# frozen_string_literal: true

require 'operations/records/build_operation'
require 'operations/records/save_operation'

module Operations::Records
  # Initializes a new record for the given table from the given attributes,
  # validates the record, and persists it to the database.
  class CreateOperation < Operations::Records::BaseOperation
    def initialize(record_class, build_operation: nil, save_operation: nil)
      super(record_class)

      @build_operation =
        build_operation || Operations::Records::BuildOperation.new(record_class)
      @save_operation =
        save_operation  || Operations::Records::SaveOperation.new(record_class)
    end

    private

    attr_reader :build_operation

    attr_reader :save_operation

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

      record = step { build_operation.call(attributes) }

      save_operation.call(record)
    end
  end
end
