# frozen_string_literal: true

require 'operations/data'

module Operations::Data
  # Operation to pull the latest commit from a data repository.
  class Pull < Cuprum::Operation
    def initialize(ssh_key: nil)
      @ssh_key = ssh_key
    end

    private

    attr_reader :ssh_key

    def git_command
      return 'git pull' unless ssh_key?

      %(GIT_SSH_COMMAND="ssh -i #{ssh_key} -o IdentitiesOnly=yes" git pull)
    end

    def process(repository:)
      Kernel.system("cd data/#{repository} && #{git_command}")
    end

    def ssh_key?
      !(ssh_key.nil? || ssh_key.empty?)
    end
  end
end
