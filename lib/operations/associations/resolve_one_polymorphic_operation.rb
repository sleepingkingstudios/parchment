# frozen_string_literal: true

require 'errors/invalid_parameters'
require 'operations/associations/find_one_polymorphic_operation'

module Operations::Associations
  # Operation that resolves a polymorphic association instance from an
  # attributes hash, either from an id/type pair or a record.
  class ResolveOnePolymorphicOperation < Cuprum::Operation
    def initialize(
      association_name:,
      permitted_types: nil,
      find_one_polymorphic_operation: nil
    )
      @association_name = association_name

      @find_one_polymorphic_operation =
        find_one_polymorphic_operation ||
        Operations::Associations::FindOnePolymorphicOperation.new(
          as:              association_name,
          permitted_types: permitted_types
        )
    end

    private

    attr_reader :association_name

    attr_reader :find_one_polymorphic_operation

    def ensure_association_exists(association)
      find_one_polymorphic_operation.call(
        id:   association.id,
        type: association.class.name
      )
    end

    def ensure_association_id_matches(association, association_id)
      return if association_id.nil? || association.id == association_id

      error = Errors::InvalidParameters.new(
        errors: [[foreign_key_name, 'does not match']]
      )

      failure(error)
    end

    def ensure_association_is_record(association)
      return if association.is_a?(ApplicationRecord)

      error = Errors::InvalidRecord.new(record_class: ApplicationRecord)

      failure(error)
    end

    def ensure_association_type_matches(association, association_type)
      return if association_type.nil? ||
                association.class.name == association_type

      error = Errors::InvalidParameters.new(
        errors: [[foreign_type_name, 'does not match']]
      )

      failure(error)
    end

    def foreign_key_name
      :"#{association_name}_id"
    end

    def foreign_type_name
      :"#{association_name}_type"
    end

    def indifferent_fetch(hsh, key)
      hsh.fetch(key.to_s) { hsh[key.intern] }
    end

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def process(attributes = {}, **keywords)
      attributes  = keywords.merge(attributes) if attributes.is_a?(Hash)
      association = indifferent_fetch(attributes, association_name)

      return validate_association(association, attributes) if association

      association_id   = indifferent_fetch(attributes, foreign_key_name)
      association_type = indifferent_fetch(attributes, foreign_type_name)

      find_one_polymorphic_operation.call(
        id:   association_id,
        type: association_type
      )
    end

    def validate_association(association, attributes)
      association_id   = indifferent_fetch(attributes, foreign_key_name)
      association_type = indifferent_fetch(attributes, foreign_type_name)

      step :ensure_association_is_record,    association
      step :ensure_association_id_matches,   association, association_id
      step :ensure_association_type_matches, association, association_type
      step :ensure_association_exists,       association

      association
    end
  end
end
