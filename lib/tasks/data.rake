# frozen_string_literal: true

require 'fixtures'

namespace :data do # rubocop:disable Metrics/BlockLength
  authentication_classes = %w[
    Authentication::User
  ]
  source_classes = %w[
    Book
  ]
  data_classes = %w[
    Mechanics::Action
    Spell
  ]
  all_classes = [
    *authentication_classes,
    *source_classes,
    *data_classes
  ]

  namespace :load do
    desc 'Loads the data from /data/fixtures into the database'
    task fixtures: :environment do
      all_classes.each do |class_name|
        record_class = class_name.constantize

        next unless Fixtures.exist?(record_class)

        Fixtures.create(record_class)
      end
    end
  end

  desc 'Loads the data from the specified fixture directory into the database'
  task :load, %i[directory] => :environment do |_task, args|
    raise ArgumentError, "directory can't be blank" if args.directory.blank?

    all_classes.each do |class_name|
      record_class = class_name.constantize

      next unless Fixtures.exist?(record_class, data_path: args.directory)

      Fixtures.create(record_class, data_path: args.directory)
    end
  end
end
