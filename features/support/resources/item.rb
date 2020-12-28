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
      convert_keys(item.data).to_json
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
      super.merge(name: 'Big Red Button')
    end

    private

    def convert_keys(obj)
      case obj
      when Hash
        obj
          .map { |key, value| [key.to_s.camelize, value] }
          .yield_self { |ary| Hash[ary] }
      when Array
        obj.map { |item| convert_keys(item) }
      else
        obj
      end
    end
  end
end
