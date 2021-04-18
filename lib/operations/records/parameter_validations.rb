# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'errors/invalid_record'
require 'errors/not_found'
require 'errors/unknown_attributes'
require 'operations/records'

module Operations::Records
  # Shared methods for validating parameters to an operation.
  module ParameterValidations
    # Shared methods for validating plural primary/foreign key arguments.
    module Many
      def handle_empty_id(id, index)
        return unless id.empty?

        error = Errors::InvalidParameters.new(
          errors: [["ids.#{index}", "can't be blank"]]
        )

        failure(error)
      end

      def handle_empty_ids_array(ids)
        return unless ids.empty?

        error = Errors::InvalidParameters.new(
          errors: [['ids', "can't be blank"]]
        )

        failure(error)
      end

      def handle_id_type_invalid(id, index)
        return if id.is_a?(String)

        error = Errors::InvalidParameters.new(
          errors: [["ids.#{index}", 'must be a String']]
        )

        failure(error)
      end

      def handle_ids_array_type_invalid(ids)
        return if ids.is_a?(Array)

        error = Errors::InvalidParameters.new(
          errors: [['ids', 'must be an Array']]
        )

        failure(error)
      end

      def handle_nil_id(id, index)
        return unless id.nil?

        error = Errors::InvalidParameters.new(
          errors: [["ids.#{index}", "can't be blank"]]
        )

        failure(error)
      end

      def handle_nil_ids_array(ids)
        return unless ids.nil?

        error = Errors::InvalidParameters.new(
          errors: [['ids', "can't be blank"]]
        )

        failure(error)
      end
    end

    # Shared methods for validating singular primary/foreign key arguments.
    module One
      def handle_empty_foreign_type(type, as: :id)
        return unless type.empty?

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, "can't be blank"]]
        )

        failure(error)
      end

      def handle_empty_id(id, as: :id)
        return unless id.empty?

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, "can't be blank"]]
        )

        failure(error)
      end

      def handle_foreign_type_type_invalid(type, as: :id)
        return if type.is_a?(String)

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, 'must be a String']]
        )

        failure(error)
      end

      # rubocop:disable Metrics/MethodLength
      def handle_foreign_type_not_class_name(type, as: :id)
        foreign_class = type.constantize

        return if foreign_class < ApplicationRecord

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, 'is not a record class name']]
        )

        failure(error)
      rescue NameError
        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, 'is not a record class name']]
        )

        failure(error)
      end
      # rubocop:enable Metrics/MethodLength

      def handle_invalid_foreign_type(type, as:)
        step { handle_nil_foreign_type(type, as: as) }
        step { handle_foreign_type_type_invalid(type, as: as) }
        step { handle_empty_foreign_type(type, as: as) }
        step { handle_foreign_type_not_class_name(type, as: as) }
      end

      def handle_id_type_invalid(id, as: :id)
        return if id.is_a?(String)

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, 'must be a String']]
        )

        failure(error)
      end

      def handle_invalid_id(id, as: :id)
        steps do
          step { handle_nil_id(id, as: as) }
          step { handle_id_type_invalid(id, as: as) }
          step { handle_empty_id(id, as: as) }
        end
      end

      def handle_nil_foreign_type(type, as:)
        return unless type.nil?

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, "can't be blank"]]
        )

        failure(error)
      end

      def handle_nil_id(id, as: :id)
        return unless id.nil?

        error = Errors::InvalidParameters.new(
          errors: [[as.to_s, "can't be blank"]]
        )

        failure(error)
      end
    end

    private

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def handle_invalid_attributes(attributes = {}, **keywords)
      attributes = keywords.merge(attributes) if attributes.is_a?(Hash)

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
