# frozen_string_literal: true

require 'fixtures'

module Fixtures
  # Fixture loader class that finds the data (and options, if any) for a given
  # data path and resource.
  class Loader
    UNDEFINED = Object.new.freeze
    private_constant :UNDEFINED

    def initialize(data_path:, resource_name:)
      @data_path         = data_path
      @resource_name     = resource_name
      @options_file_path = UNDEFINED
    end

    attr_reader :data

    attr_reader :data_path

    attr_reader :options

    attr_reader :resource_name

    def call
      @data    = read_data
      @options = read_options

      self
    end

    def exist?
      data_dir_exists? || data_file_exists?
    end

    private

    def data_dir_exists?
      File.exist?(data_dir_path) && File.directory?(data_dir_path)
    end

    def data_dir_path
      @data_dir_path ||= resolved_data_path.join(resource_name)
    end

    def data_file_exists?
      File.exist?(data_file_path)
    end

    def data_file_path
      @data_file_path ||= resolved_data_path.join("#{resource_name}.yml")
    end

    def options_file_exists?
      # rubocop:disable Style/DoubleNegation
      !!options_file_path && File.exist?(options_file_path)
      # rubocop:enable Style/DoubleNegation
    end

    def options_file_path
      return @options_file_path unless @options_file_path == UNDEFINED

      @options_file_path =
        if data_dir_exists?
          resolved_data_path.join(resource_name, '_options.yml')
        elsif data_file_exists?
          resolved_data_path.join("#{resource_name}_options.yml")
        end
    end

    def read_data
      return read_data_dir  if data_dir_exists?
      return read_data_file if data_file_exists?

      message =
        "Unable to load fixtures from /data/#{data_path}/#{resource_name}"

      raise Fixtures::FixturesNotDefinedError, message
    end

    def read_data_dir
      Dir.entries(data_dir_path).each.with_object([]) do |file_name, data|
        next if file_name.start_with?('_', '.')

        file_path = File.join(data_dir_path, file_name)
        file_data = YAML.safe_load(File.read(file_path))

        file_data.is_a?(Array) ? data.concat(file_data) : data << file_data
      end
    end

    def read_data_file
      YAML.safe_load(File.read(data_file_path))
    end

    def read_options
      return {} unless options_file_exists?

      YAML.safe_load(File.read(options_file_path))
    end

    def resolve_data_path
      return Rails.root.join(data_path) if data_path.start_with?('.')

      if data_path.start_with?('/', '~')
        return Pathname.new(File.expand_path(data_path))
      end

      Rails.root.join 'data', data_path
    end

    def resolved_data_path
      @resolved_data_path ||= resolve_data_path
    end
  end
end
