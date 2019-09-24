# frozen_string_literal: true

require 'fixtures'

module Fixtures
  # Class to load data, or instantiate or persist records from stored fixture
  # files.
  class Builder
    class Error < StandardError; end

    class FixturesNotDefinedError   < Fixtures::Builder::Error; end
    class InsufficientFixturesError < Fixtures::Builder::Error; end

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

    def build(count: nil)
      read(count: count).map { |attributes| build_record(attributes) }
    end

    def create(count: nil)
      read(count: count).map { |attributes| find_or_create_record(attributes) }
    end

    def read(count: nil)
      return validate_count(read_data_file, count: count) if data_file_exists?

      return validate_count(read_data_dir, count: count)  if data_dir_exists?

      message =
        "Unable to load fixtures from /data/#{environment}/#{resource_name}"

      raise FixturesNotDefinedError, message
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

    def invalid_count_message(expected, actual)
      message =
        "Requested #{expected} #{resource_name.singularize.pluralize(expected)}"

      if actual.zero?
        message + ', but the data is empty'
      else
        message +
          ", but there are only #{actual} " +
          resource_name.singularize.pluralize(actual)
      end
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

    def validate_count(data, count:)
      return data if count.nil?

      return data[0...count] if count <= data.size

      message = invalid_count_message(count, data.size)

      raise InsufficientFixturesError, message
    end
  end
end
