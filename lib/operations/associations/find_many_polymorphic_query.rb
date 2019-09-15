# frozen_string_literal: true

require 'operations/associations/base_polymorphic_query'

module Operations::Associations
  # Finds the records corresponding to the specified polymorphic association for
  # an array of resources.
  class FindManyPolymorphicQuery < BasePolymorphicQuery
    private

    def association_key(foreign_type)
      foreign_type.split('::').last.underscore.pluralize
    end

    def find_associations(association_keys, options)
      association_keys.each.with_object(Hash.new { |hsh, key| hsh[key] = [] }) \
      do |(class_name, foreign_keys), associations|
        key         = options.fetch(:as, association_key(class_name)).to_s
        klass       = class_name.constantize
        factory     = operation_factory_for(klass)
        operation   = factory.find_many

        associations[key] += step(operation.call(foreign_keys))
      end
    end

    def group_association_keys(resources)
      return {} if resources.empty?

      association_keys = Hash.new { |hsh, key| hsh[key] = [] }

      resources.each.with_object(association_keys) do |resource, hsh|
        foreign_key  = resource.send(foreign_key_name)
        foreign_type = resource.send(foreign_type_name)

        next unless foreign_key && foreign_type

        hsh[foreign_type] << foreign_key
      end
    end

    def process(resources, **options)
      association_keys = step :group_association_keys, resources

      step :find_associations, association_keys, options
    end
  end
end
