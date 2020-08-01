# frozen_string_literal: true

require_relative '../resources'
require_relative './definition'

module Features::Resources
  class Mechanic < Features::Resources::Definition
    def fetch_type(mechanic)
      mechanic.class.name.sub(/\AMechanics::/, '')
    end

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
