# frozen_string_literal: true

require 'cuprum/rails/actions/destroy'

require 'actions/api/sources/books'

module Actions::Api::Sources::Books
  class Destroy < Cuprum::Rails::Actions::Destroy
    UUID_PATTERN = /\A\h{8}-\h{4}-\h{4}-\h{4}-\h{12}\z/.freeze
    private_constant :UUID_PATTERN

    private

    def find_entity(primary_key:)
      return super if uuid?(primary_key)

      step { collection.find_matching.call { { 'slug' => primary_key } } }.first
    end

    def uuid?(primary_key)
      primary_key.match?(UUID_PATTERN)
    end
  end
end
