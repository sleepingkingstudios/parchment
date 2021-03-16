# frozen_string_literal: true

require 'operations/associations'
require 'operations/records/base_operation'

module Operations::Associations
  # Takes one or more record objects, loads the associated records for the given
  # singular association, and caches the association to avoid an N+1 query.
  class CacheOneOperation < Operations::Records::BaseOperation
    def initialize(record_class, association_name:)
      super(record_class)

      @association_name = association_name
      @association      = find_association
    end

    private

    attr_reader :association

    attr_reader :association_name

    def assign_associated_records(associated_records:, records:)
      records.each do |record|
        record.association(association_name).target =
          associated_records
          .find { |other| other.send(foreign_key_name) == record.id }
      end
    end

    def find_associated_records(records)
      query = { foreign_key_name => records.map(&:id) }

      if polymorphic?
        query[foreign_type_name] = non_sti_class_name(record_class)
      end

      inverse_factory.find_matching.call(where: query)
    end

    def find_association
      association = record_class.reflections[association_name.to_s]

      return association if association

      raise ArgumentError,
        "#{record_class.name} does not define association" \
        " #{association_name.inspect}",
        caller[1..-1]
    end

    def foreign_key_name
      association.foreign_key
    end

    def foreign_type_name
      association.type
    end

    def inverse_association
      @inverse_association ||= association.inverse_of
    end

    def inverse_class
      inverse_association.active_record
    end

    def inverse_factory
      @inverse_factory ||= Operations::Records::Factory.for(inverse_class)
    end

    def non_sti_class_name(record_class)
      return record_class.name if record_class.descends_from_active_record?

      non_sti_class_name(record_class.superclass)
    end

    def normalize_records(records)
      step :handle_invalid_record, records if records.nil?

      Array(records).each do |record|
        step :handle_invalid_record, record
      end
    end

    def polymorphic?
      inverse_association.polymorphic?
    end

    def process(records)
      plural             = records.is_a?(Array)
      records            = normalize_records(records)
      associated_records = step :find_associated_records, records
      records            = step :assign_associated_records,
        associated_records: associated_records,
        records:            records

      plural ? records : records.first
    end
  end
end
