# frozen_string_literal: true

require 'errors/not_found'
require 'errors/not_unique'
require 'operations/records/base_operation'

module Operations::Records
  # Queries the database for records in the given table matching the specified
  # criteria.
  class FindMatchingOperation < Operations::Records::BaseOperation
    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    # @param optional [true, false] If false, the operation will return an error
    #   if no records are found. Defaults to true.
    # @param unique [true, false] If true, the operation will return an error if
    #   more than one record is found. Defaults to false.
    def initialize(record_class, optional: true, unique: false)
      super(record_class)

      @optional = !!optional # rubocop:disable Style/DoubleNegation
      @unique   = !!unique   # rubocop:disable Style/DoubleNegation
    end

    def optional?
      @optional
    end

    def unique?
      @unique
    end

    private

    def build_query(order:, where:)
      record_class
        .all
        .where(where)
        .order(order)
    end

    def default_order
      { created_at: :desc }
    end

    def process(order: nil, where: nil)
      order   = default_order if order.blank?
      query   = build_query(order: order, where: where)
      records = query.to_a

      step { validate_result(records, where) }

      success(records)
    end

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def validate_result(records, where = {}, **keywords)
      where = keywords.merge(where) if where.is_a?(Hash)

      step { validate_result_exists(records, where) }
      step { validate_record_unique(records, where) }
    end

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def validate_result_exists(records, where = {}, **keywords)
      where = keywords.merge(where) if where.is_a?(Hash)

      return if optional? || !records.empty?

      error = Errors::NotFound.new(
        attributes:   where || {},
        record_class: record_class
      )

      failure(error)
    end

    # @note The keywords/attributes merge handles pre-2.7 keyword delegation.
    #   See https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/
    def validate_record_unique(records, where = {}, **keywords)
      where = keywords.merge(where) if where.is_a?(Hash)

      return if !unique? || records.size <= 1

      error = Errors::NotUnique.new(
        attributes:   where || {},
        record_class: record_class,
        records:      records
      )

      failure(error)
    end
  end
end
