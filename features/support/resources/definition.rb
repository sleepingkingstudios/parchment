# frozen_string_literal: true

require 'fixtures'

require 'support/resources'

module Features::Resources
  class Definition
    def self.instance
      @instance ||= new
    end

    def block_attributes
      %w[name]
    end

    def class_name
      name
    end

    def fetch(record, attribute)
      return record.send(attribute) unless respond_to?(:"fetch_#{attribute}")

      send(:"fetch_#{attribute}", record)
    end

    def fixtures?
      true
    end

    def load_fixtures!
      return unless fixtures?

      Fixtures.create(resource_class)
    end

    def name
      @name ||= self.class.name.sub(/\AFeatures::Resources::/, '')
    end

    def primary_attribute
      :name
    end

    def source?
      type == :source
    end

    def resource_class
      @resource_class ||= Object.const_get(class_name)
    end

    def table_columns
      %w[name]
    end

    def type
      :resource
    end
  end
end
