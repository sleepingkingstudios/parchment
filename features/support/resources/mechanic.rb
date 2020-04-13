# frozen_string_literal: true

require 'support/resources'

module Features::Resources
  class Mechanic < Features::Resources::Definition
    def table_columns
      @table_columns ||= %w[
        name
        short_description
      ]
    end

    def type
      :mechanic
    end
  end
end
