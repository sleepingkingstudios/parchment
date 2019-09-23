# frozen_string_literal: true

require 'fixtures'

module Fixtures
  # Class to load data, or instantiate or persist records from stored fixture
  # files.
  class Builder
    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    # @param environment [String] The data directory to load from.
    def initialize(record_class, environment: 'fixtures')
      @record_class = record_class
      @environment  = environment
    end

    # @return [String] the data directory to load from.
    attr_reader :environment

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    def build
      read.map { |attributes| build_record(attributes) }
    end

    def create
      read.map { |attributes| find_or_create_record(attributes) }
    end

    def read
      return read_data_file if data_file_exists?

      return read_data_dir if data_dir_exists?

      message =
        "Unable to load fixtures from /data/#{environment}/#{resource_name}"

      raise message
    end

    private

    def build_record(attributes)
      record_class.new(attributes)
    end

    def create_record(attributes)
      build_record(attributes).tap(&:save!)
    end

    def data_dir
      @data_dir ||= Rails.root.join 'data', environment, resource_name
    end

    def data_dir_exists?
      File.exist?(data_dir) && File.directory?(data_dir)
    end

    def data_file
      @data_file ||= Rails.root.join 'data', environment, "#{resource_name}.yml"
    end

    def data_file_exists?
      File.exist?(data_file)
    end

    def find_or_create_record(attributes)
      record = find_record(attributes)

      if record
        update_record(record, attributes)
      else
        create_record(attributes)
      end
    end

    def find_record(attributes)
      record_class.where(id: attributes.fetch('id')).first
    end

    def read_data_dir
      Dir.entries(data_dir).map do |file_name|
        YAML.safe_load(File.read(file_name))
      end
    end

    def read_data_file
      YAML.safe_load(File.read(data_file))
    end

    def resource_name
      @resource_name ||= record_class.name.underscore.pluralize
    end

    def update_record(record, attributes)
      record.assign_attributes(attributes)

      record.tap(&:save!)
    end
  end
end
