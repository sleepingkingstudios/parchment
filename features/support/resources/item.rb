# frozen_string_literal: true

require_relative '../resources'
require_relative './definition'

module Features::Resources
  class Item < Features::Resources::Definition
    def block_attributes
      %w[
        name
        cost
        data
        description
        short_description
        slug
        type
      ]
    end

    def class_name
      'References::Item'
    end

    def invalid_attributes
      super.merge(description: '')
    end

    def table_columns
      @table_columns ||= %w[
        name
        cost
      ]
    end

    def valid_attributes
      super.merge(name: 'Do Not Touch Button')
    end
  end
end
