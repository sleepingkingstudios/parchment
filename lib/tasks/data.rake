# frozen_string_literal: true

require 'fixtures'

require 'operations/data/clone'
require 'operations/data/exists'
require 'operations/data/load'
require 'operations/data/pull'

namespace :data do # rubocop:disable Metrics/BlockLength
  namespace :load do
    desc 'Loads the data from /data/fixtures into the database'
    task fixtures: :environment do
      Operations::Data::Load.new.call(directory_name: 'fixtures')
    end
  end

  desc 'Loads the data from the specified fixture directory into the database'
  task :load, %i[directory] => :environment do |_task, args|
    raise ArgumentError, "directory can't be blank" if args.directory.blank?

    Operations::Data::Load.new.call(directory_name: args.directory)
  end

  desc 'Loads the data from the specified git repository into the database'
  task :pull, %i[source] => :environment do |_task, args|
    raise ArgumentError, "source can't be blank" if args.source.blank?

    organization, repository = args.source.split '/'

    git_result =
      if Operations::Data::Exists.new.call(directory_name: repository).success?
        Operations::Data::Pull
          .new(ssh_key: '.ssh/deploy_rsa')
          .call(repository: repository)
      else
        Operations::Data::Clone
          .new(ssh_key: '.ssh/deploy_rsa')
          .call(organization: organization, repository: repository)
      end

    next unless git_result.success?

    Operations::Data::Load.new.call(directory_name: repository)
  end
end
