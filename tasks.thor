# frozen_string_literal: true

require 'sleeping_king_studios/tasks'

SleepingKingStudios::Tasks.configure do |config|
  config.ci do |ci|
    ci.cucumber.update retry: 3

    ci.eslint.update default_files: '"app/javascript/**/*"'

    ci.rspec.update format: 'progress'

    ci.steps =
      if ENV['CI']
        %i[rspec rubocop simplecov jest eslint cucumber]
      else
        %i[rspec rubocop simplecov jest eslint]
      end
  end

  config.file do |file|
    file.template_paths =
      [
        '../sleeping_king_studios-templates/lib',
        file.class.default_template_path
      ]
  end
end

load 'sleeping_king_studios/tasks/ci/tasks.thor'
load 'sleeping_king_studios/tasks/file/tasks.thor'
