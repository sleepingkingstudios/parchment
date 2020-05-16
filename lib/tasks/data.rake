# frozen_string_literal: true

require 'fixtures'

require 'operations/data/clone'
require 'operations/data/exists'
require 'operations/data/pull'

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

  desc 'Clones a git repository or pulls the latest commit as a data source'
  task :pull, %i[source] => :environment do |_task, args|
    raise ArgumentError, "source can't be blank" if args.source.blank?

    organization, repository = args.source.split '/'

    if Operations::Data::Exists.new.call(directory_name: repository).success?
      Operations::Data::Pull
        .new(ssh_key: '.ssh/deploy_rsa')
        .call(repository: repository)
    else
      Operations::Data::Clone
        .new(ssh_key: '.ssh/deploy_rsa')
        .call(organization: organization, repository: repository)
    end
  end
end
