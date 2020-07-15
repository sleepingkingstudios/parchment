# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'errors/not_found'
require 'operations/attributes/generate_slug'
require 'operations/origins'
require 'operations/records/base_operation'

module Operations::Origins
  # Queries the database for the record in the given table with the given slug.
  class FindBySlugOperation < Operations::Records::BaseOperation
    private

    def empty_error(as:)
      Errors::InvalidParameters.new(errors: [[as.to_s, "can't be blank"]])
    end

    def find_record(slug)
      query  = record_class.where(slug: slug).order(created_at: :desc).limit(1)
      record = query.first

      return record if record

      failure(not_found_error(slug))
    end

    def invalid_error(as:)
      Errors::InvalidParameters.new(errors: [[as.to_s, 'is invalid']])
    end

    def normalize_slug(slug, as:)
      operation = Operations::Attributes::GenerateSlug.new
      result    = operation.call(slug)

      return result if result.success?

      failure(invalid_error(as: as))
    end

    def not_found_error(slug)
      Errors::NotFound.new(
        attributes:   { slug: slug },
        record_class: record_class
      )
    end

    def process(slug, as: :slug)
      step :require_slug, slug, as: as

      slug = step :normalize_slug, slug, as: as

      step :find_record, slug
    end

    def require_slug(slug, as:)
      return failure(empty_error(as: as)) if slug.nil?

      return failure(type_error(as: as)) unless slug.is_a?(String)

      return unless slug.empty?

      failure(empty_error(as: as))
    end

    def type_error(as:)
      Errors::InvalidParameters.new(errors: [[as.to_s, 'must be a String']])
    end
  end
end
