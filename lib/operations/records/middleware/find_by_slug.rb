# frozen_string_literal: true

require 'operations/middleware'
require 'operations/records/find_by_slug_operation'
require 'operations/records/middleware'
require 'operations/records/subclass'

module Operations::Records::Middleware
  # Middleware operation for finding a record by its slug.
  class FindBySlug < Operations::Middleware
    extend Operations::Records::Subclass

    UUID_PATTERN = /\A\h{8}-\h{4}-\h{4}-\h{4}-\h{12}\z/.freeze
    private_constant :UUID_PATTERN

    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    def initialize(record_class)
      @record_class = record_class
    end

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    private

    def find_by_slug(slug)
      Operations::Records::FindBySlugOperation.new(record_class).call(slug)
    end

    def process(next_command, primary_key, as: :id)
      slug?(primary_key) ? find_by_slug(primary_key) : super
    end

    def slug?(primary_key)
      primary_key.is_a?(String) && !primary_key.empty? && !uuid?(primary_key)
    end

    def uuid?(primary_key)
      primary_key.match?(UUID_PATTERN)
    end
  end
end
