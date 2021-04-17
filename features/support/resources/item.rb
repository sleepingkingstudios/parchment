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

    def fetch_data(item)
      item.data.to_json
    end

    def fetch_type(item)
      return '(None)' if item.type.nil?

      item.type.split('::').last.underscore.split('_').map(&:titleize).join(' ')
    end

    def invalid_attributes
      super.merge(description: '')
    end

    def table_columns
      @table_columns ||= %w[
        name
        cost
        type
      ]
    end

    def valid_attributes
      super.merge(name: 'Big Red Button')
    end
  end
end
