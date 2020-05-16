# frozen_string_literal: true

require 'operations/data/pull'

RSpec.describe Operations::Data::Pull do
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
    let(:repository)       { 'example_repository' }
    let(:expected_syscall) { "cd data/#{repository} && git pull" }

    before(:example) { allow(Kernel).to receive(:system) }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:repository)
    end

    it 'should return a passing result' do
      expect(operation.call(repository: repository))
        .to have_passing_result
    end

    it 'should run the syscall' do
      operation.call(repository: repository)

      expect(Kernel).to have_received(:system).with(expected_syscall)
    end

    context 'when the ssh_key is set' do
      let(:ssh_key) { '.ssh/example_key' }
      let(:options) { super().merge(ssh_key: ssh_key) }
      let(:expected_syscall) do
        "cd data/#{repository} && " +
          %(GIT_SSH_COMMAND="ssh -i #{ssh_key} -o IdentitiesOnly=yes" git pull)
      end

      it 'should return a passing result' do
        expect(operation.call(repository: repository))
          .to have_passing_result
      end

      it 'should run the syscall' do
        operation.call(repository: repository)

        expect(Kernel).to have_received(:system).with(expected_syscall)
      end
    end
  end
end
