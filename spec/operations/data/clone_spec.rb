# frozen_string_literal: true

require 'operations/data/clone'

RSpec.describe Operations::Data::Clone do
  subject(:operation) { described_class.new(**options) }

  let(:options) { {} }

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:ssh_key)
    end
  end

  describe '#call' do
    let(:organization) { 'example_organization' }
    let(:repository)   { 'example_repository' }
    let(:expected_syscall) do
      "git clone git@github.com:#{organization}/#{repository}.git" \
      " data/#{repository}"
    end

    before(:example) { allow(Kernel).to receive(:system) }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:organization, :repository)
    end

    it 'should run the syscall' do
      operation.call(organization: organization, repository: repository)

      expect(Kernel).to have_received(:system).with(expected_syscall)
    end

    context 'when the ssh_key is set' do
      let(:ssh_key) { '.ssh/example_key' }
      let(:options) { super().merge(ssh_key: ssh_key) }
      let(:expected_syscall) do
        %(GIT_SSH_COMMAND="ssh -i #{ssh_key} -o IdentitiesOnly=yes" #{super()})
      end

      it 'should run the syscall' do
        operation.call(organization: organization, repository: repository)

        expect(Kernel).to have_received(:system).with(expected_syscall)
      end
    end
  end
end
