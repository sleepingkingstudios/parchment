# frozen_string_literal: true

require 'cuprum/built_in/identity_command'

require 'fixtures/middleware'
require 'operations/middleware'

module Fixtures
  # Class to load data, or instantiate or persist records from stored fixture
  # files.
  class Builder
    # @param record_class [Class] The class of record that the operation's
    #   business logic operates on.
    # @param data_path [String] The data directory to load from.
    def initialize(record_class, data_path: 'fixtures')
      @record_class = record_class
      @data_path    = data_path
    end

    # @return [String] the data directory to load from.
    attr_reader :data_path

    # @return [Class] the class of record that the operation's business logic
    #   operates on.
    attr_reader :record_class

    def build(**options)
      process(command: :build, **options)
    end

    def create(**options)
      process(command: :create_or_update, **options)
    end

    def read(**options)
      process(command: :read, **options)
    end

    private

    def apply_count(data, count:)
      return data if count.nil?

      return data[0...count] if count <= data.size

      message = invalid_count_message(count, data.size)

      raise Fixtures::NotEnoughFixturesError, message
    end

    def apply_filters(data, except:)
      return data if except.blank?

      data.map { |hsh| hsh.except(*except) }
    end

    def build_middleware(middleware)
      builder = Fixtures::Middleware::Builder.new

      middleware.map do |opts|
        options = opts.fetch('options', {}).symbolize_keys

        builder.build(opts.fetch('type'), **options)
      end
    end

    def build_command(**_options)
      operation_factory.build
    end

    def create_or_update_command(**options)
      find_by = Array(options.fetch(:find_by, :id))

      operation_factory.create_or_update(find_by: find_by)
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

    def load_data
      loader = Fixtures::Loader.new(
        data_path:     data_path,
        resource_name: resource_name
      ).call

      [loader.data, loader.options]
    end

    def operation_factory
      @operation_factory ||= Operations::Records::Factory.for(record_class)
    end

    def process(command:, **builder_options)
      skip_middleware = builder_options.delete(:skip_middleware)
      data, options   = load_data
      command         = send(:"#{command}_command", **options.symbolize_keys)
      data            = process_data(data, **builder_options)
      middleware      = build_middleware(options.fetch('middleware', []))

      unless skip_middleware
        command =
          Operations::Middleware.apply(command: command, middleware: middleware)
      end

      data.map { |hsh| command.call(hsh).value }
    end

    def process_data(data, count: nil, except: nil)
      data = apply_count(data, count: count)
      data = apply_filters(data, except: Array(except).map(&:to_s))

      data
    end

    def read_command(**_options)
      Cuprum::BuiltIn::IdentityCommand.new
    end

    def resource_name
      @resource_name ||= record_class.name.underscore.pluralize
    end
  end
end
