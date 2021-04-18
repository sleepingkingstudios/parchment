# frozen_string_literal: true

require 'cuprum/error'

require 'operations/data'

module Operations::Data
  # Operation to determine if a git repository is present.
  class Exists < Cuprum::Operation
    private

    def directory_exists?(directory_path)
      return true if Dir.exist?(directory_path)

      message = "Directory does not exist - #{directory_path.to_s.inspect}"
      error   = Cuprum::Error.new(message: message)

      failure(error)
    end

    def process(directory_name:)
      directory_path = Rails.root.join 'data', directory_name

      step { directory_exists?(directory_path) }
      step { repository_exists?(directory_path) }
    end

    def repository_exists?(directory_path)
      repository_path = directory_path.join '.git'

      return true if Dir.exist?(repository_path)

      message =
        "Directory is not a git repository - #{directory_path.to_s.inspect}"
      error   = Cuprum::Error.new(message: message)

      failure(error)
    end
  end
end
