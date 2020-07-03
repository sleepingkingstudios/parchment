# frozen_string_literal: true

require 'operations/records/base_operation'

module Operations::Records
  # Updates the given record with the given attributes.
  class AssignOperation < Operations::Records::BaseOperation
    private

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(record, attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

      step :handle_invalid_attributes, attributes
      step :handle_invalid_record,     record

      handle_unknown_attribute do
        record.tap { record.assign_attributes(attributes) }
      end
    end
  end
end
