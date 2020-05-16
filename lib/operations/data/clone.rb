# frozen_string_literal: true

require 'operations/data'

module Operations::Data
  # Operation to clone a git repository into the data directory.
  class Clone < Cuprum::Operation
    def initialize(ssh_key: nil)
      @ssh_key = ssh_key
    end

    private

    attr_reader :ssh_key

    def build_repository_url(organization:, repository:)
      "git@github.com:#{organization}/#{repository}.git"
    end

    def build_syscall(organization:, repository:)
      repository_url = build_repository_url(
        organization: organization,
        repository:   repository
      )
      syscall = "git clone #{repository_url} data/#{repository}"

      return syscall unless ssh_key?

      %(GIT_SSH_COMMAND="ssh -i #{ssh_key} -o IdentitiesOnly=yes" #{syscall})
    end

    def process(organization:, repository:)
      Kernel.system(
        build_syscall(organization: organization, repository: repository)
      )
    end

    def ssh_key?
      !(ssh_key.nil? || ssh_key.empty?)
    end
  end
end
