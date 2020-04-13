# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Book < Features::Resources::Source
    def primary_attribute
      :title
    end

    def table_columns
      @table_columns ||= %w[
        title
        publisher_name
      ]
    end
  end
end
