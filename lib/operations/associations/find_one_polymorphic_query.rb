# frozen_string_literal: true

require 'operations/associations/base_polymorphic_query'

module Operations::Associations
  # Finds the record corresponding to the specified polymorphic association for
  # a single resource.
  class FindOnePolymorphicQuery < BasePolymorphicQuery
    private

    def association_key(foreign_type)
      foreign_type.split('::').last.underscore.singularize
    end

    def find_association(foreign_key, foreign_type)
      klass        = foreign_type.constantize
      factory      = operation_factory_for(klass)
      operation    = factory.find_one

      operation.call(foreign_key)
    end

    def process(resource, **options)
      foreign_key  = resource.send(foreign_key_name)
      foreign_type = resource.send(foreign_type_name)

      return success({}) unless foreign_key && foreign_type

      association = step :find_association, foreign_key, foreign_type
      key         = options.fetch(:as, association_key(foreign_type)).to_s

      success(key => association)
    end
  end
end
