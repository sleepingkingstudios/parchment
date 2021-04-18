# frozen_string_literal: true

require 'errors/sources/invalid_origin'
require 'operations/records/base_operation'
require 'operations/sources'

module Operations::Sources
  # Operation to update the metadata of a Source.
  class AssignMetadataOperation < Operations::Records::BaseOperation
    def initialize
      super(Source)
    end

    private

    def handle_invalid_origin(origin)
      return if origin_types.any? { |type| origin.is_a?(type) }

      error = Errors::Sources::InvalidOrigin.new

      failure(error)
    end

    def origin_types
      Source::ORIGIN_TYPES.map(&:constantize)
    end

    def process(record)
      step { handle_invalid_record(record) }
      step { handle_invalid_origin(record.origin) }

      update_metadata(record)

      record
    end

    def update_metadata(record)
      origin_class = origin_types.find { |type| record.origin.is_a?(type) }

      update_metadata_from_book(record) if origin_class == Book
    end

    def update_metadata_from_book(record)
      book = record.origin

      record.name     = book.title
      record.playtest = book.playtest
    end
  end
end
