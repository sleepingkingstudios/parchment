# frozen_string_literal: true

require 'errors/invalid_association'
require 'errors/invalid_parameters'

require 'operations/records/base_operation'

module Operations::Records
  # rubocop:disable Metrics/ClassLength

  # Queries the database for the record corresponding to the given polymorphic
  # association for the given record.
  class FindPolymorphicAssociationOperation < BaseOperation
    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    # @param association_name [String, Symbol] The name of the polymorphic
    #   association.
    def initialize(record_class, association_name)
      super(record_class)

      @association_name = association_name
    end

    # @return [String, Symbol] the name of the polymorphic association.
    attr_reader :association_name

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    private

    def association
      @association ||= record_class.reflections[association_name.to_s]
    end

    def find_inverse_association(association_class)
      association_key = association_name.intern

      association_class.reflections.find do |(_, reflection)|
        reflection.options[:as] == association_key
      end
    end

    def foreign_key_name
      association.foreign_key
    end

    def foreign_type_name
      association.foreign_type
    end

    def handle_invalid_association
      return if association

      error =
        Errors::InvalidAssociation.new(
          association_name: association_name,
          record_class:     record_class
        )

      failure(error)
    end

    def handle_foreign_key_empty(foreign_key)
      return unless foreign_key.empty?

      error = Errors::InvalidParameters.new(
        errors: [[foreign_key_name, "can't be blank"]]
      )

      failure(error)
    end

    def handle_foreign_key_invalid_type(foreign_key)
      return if foreign_key.is_a?(String)

      error = Errors::InvalidParameters.new(
        errors: [[foreign_key_name, 'must be a String']]
      )

      failure(error)
    end

    def handle_foreign_key_nil(foreign_key)
      return unless foreign_key.nil?

      error = Errors::InvalidParameters.new(
        errors: [[foreign_key_name, "can't be blank"]]
      )

      failure(error)
    end

    def handle_foreign_type_empty(foreign_type)
      return unless foreign_type.empty?

      error = Errors::InvalidParameters.new(
        errors: [[foreign_type_name, "can't be blank"]]
      )

      failure(error)
    end

    def handle_foreign_type_invalid_type(foreign_type)
      return if foreign_type.is_a?(String)

      error = Errors::InvalidParameters.new(
        errors: [[foreign_type_name, 'must be a String']]
      )

      failure(error)
    end

    def handle_foreign_type_nil(foreign_type)
      return unless foreign_type.nil?

      error = Errors::InvalidParameters.new(
        errors: [[foreign_type_name, "can't be blank"]]
      )

      failure(error)
    end

    def invalid_foreign_type_error
      Errors::InvalidParameters.new(
        errors: [[foreign_type_name, 'is invalid']]
      )
    end

    def operation_factory_for(klass)
      return klass::Factory if klass.const_defined?(:Factory)

      Operations::Records::Factory.new(klass)
    end

    def process(attributes)
      step :handle_invalid_association
      step :handle_invalid_attributes, attributes

      foreign_key, association_class =
        step :validate_foreign_key_and_type, attributes

      return success(nil) unless association_class

      factory = operation_factory_for(association_class)

      step factory.find_one.call(foreign_key)
    end

    def validate_association_class(foreign_type)
      association_class = step :validate_association_class_exists, foreign_type

      step :validate_inverse_association, association_class

      association_class
    end

    def validate_association_class_exists(foreign_type)
      association_class = foreign_type.constantize

      return association_class if association_class < ApplicationRecord

      failure(invalid_foreign_type_error)
    rescue NameError
      failure(invalid_foreign_type_error)
    end

    # rubocop:disable Metrics/AbcSize
    def validate_foreign_key_and_type(attributes)
      foreign_key  =
        attributes[foreign_key_name]  || attributes[foreign_key_name.intern]
      foreign_type =
        attributes[foreign_type_name] || attributes[foreign_type_name.intern]

      return if foreign_key.blank? && foreign_type.blank?

      step :validate_foreign_key,  foreign_key
      step :validate_foreign_type, foreign_type

      association_class = step :validate_association_class, foreign_type

      [foreign_key, association_class]
    end
    # rubocop:enable Metrics/AbcSize

    def validate_foreign_key(foreign_key)
      step :handle_foreign_key_nil,          foreign_key
      step :handle_foreign_key_invalid_type, foreign_key
      step :handle_foreign_key_empty,        foreign_key
    end

    def validate_foreign_type(foreign_type)
      step :handle_foreign_type_nil,          foreign_type
      step :handle_foreign_type_invalid_type, foreign_type
      step :handle_foreign_type_empty,        foreign_type
    end

    def validate_inverse_association(association_class)
      return if find_inverse_association(association_class)

      failure(invalid_foreign_type_error)
    end
  end
  # rubocop:enable Metrics/ClassLength
end
