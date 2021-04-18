# frozen_string_literal: true

require 'fixtures'
require 'operations/data'

module Operations::Data
  # Operation to import fixture data from a given repository.
  class Load < Cuprum::Operation
    # Models related to authentication.
    AUTHENTICATION_MODELS = %w[
      Authentication::User
    ].freeze

    # Models that store domain data.
    DATA_MODELS = %w[
      Mechanics::Action
      Mechanics::Condition
      References::Item
      References::Items::MagicItem
      References::Language
      References::Skill
      Spell
    ].freeze

    # Models that represent domain data sources.
    SOURCE_MODELS = %w[
      Book
    ].freeze

    private

    def empty?(value)
      value.respond_to?(:empty?) && value.empty?
    end

    def load_fixtures(directory_name:, model_classes:)
      model_classes.each do |class_name|
        model_class = class_name.constantize

        next unless Fixtures.exist?(model_class, data_path: directory_name)

        Fixtures.create(model_class, data_path: directory_name)
      end
    end

    def process(directory_name:)
      step { require_directory(directory_name) }

      [AUTHENTICATION_MODELS, SOURCE_MODELS, DATA_MODELS].each \
      do |model_classes|
        step do
          load_fixtures(
            directory_name: directory_name,
            model_classes:  model_classes
          )
        end
      end
    end

    def require_directory(directory_name)
      return if directory_name.is_a?(String) && !directory_name.empty?

      if directory_name.nil? || empty?(directory_name)
        return failure(Cuprum::Error.new(message: "Directory can't be blank"))
      end

      failure(Cuprum::Error.new(message: 'Directory must be a string'))
    end
  end
end
