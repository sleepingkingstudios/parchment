# frozen_string_literal: true

require 'rails_helper'

require 'fixtures'

require 'support/examples/rake_examples'

RSpec.describe 'rake' do # rubocop:disable RSpec/DescribeClass
  include Spec::Support::Examples::RakeExamples

  before(:context) do # rubocop:disable RSpec/BeforeAfterAll
    Spec::Support::Examples::RakeExamples.load_tasks_once
  end

  describe 'data:load' do
    let(:directory) { :secrets }
    let(:task)      { Rake::Task['data:load'].tap(&:reenable) }

    include_examples 'should list the task',
      'data:load',
      'Loads the data from the specified fixture directory into the database',
      arguments: %w[directory]

    describe 'with no arguments' do
      it 'should raise an error' do
        expect { task.invoke }
          .to raise_error ArgumentError, "directory can't be blank"
      end
    end

    describe 'with a valid data directory' do
      let(:load_result) { Cuprum::Result.new }
      let(:load_operation) do
        instance_double(Cuprum::Operation, call: load_result)
      end

      before(:example) do
        allow(Operations::Data::Load)
          .to receive(:new)
          .and_return(load_operation)
      end

      it 'should load the fixtures' do
        task.invoke(directory)

        expect(load_operation)
          .to have_received(:call)
          .with(directory_name: directory)
      end
    end
  end

  describe 'data:load:fixtures' do
    let(:task)        { Rake::Task['data:load:fixtures'].tap(&:reenable) }
    let(:load_result) { Cuprum::Result.new }
    let(:load_operation) do
      instance_double(Cuprum::Operation, call: load_result)
    end

    before(:example) do
      allow(Operations::Data::Load)
        .to receive(:new)
        .and_return(load_operation)
    end

    include_examples 'should list the task',
      'data:load:fixtures',
      'Loads the data from /data/fixtures into the database'

    it 'should load the fixtures' do
      task.invoke

      expect(load_operation)
        .to have_received(:call)
        .with(directory_name: 'fixtures')
    end
  end

  describe 'data:pull' do
    let(:organization)  { 'example_organization' }
    let(:repository)    { 'example_repository' }
    let(:source)        { "#{organization}/#{repository}" }
    let(:task)          { Rake::Task['data:pull'].tap(&:reenable) }

    include_examples 'should list the task',
      'data:pull',
      'Loads the data from the specified git repository into the database',
      arguments: %w[source]

    context 'when the data directory is not a repository' do
      let(:exists_result) { Cuprum::Result.new(status: :failure) }
      let(:clone_result)  { Cuprum::Result.new(status: :success) }
      let(:load_result)   { Cuprum::Result.new(status: :success) }
      let(:exists_operation) do
        instance_double(Cuprum::Operation, call: exists_result)
      end
      let(:clone_operation) do
        instance_double(Cuprum::Operation, call: clone_result)
      end
      let(:load_operation) do
        instance_double(Cuprum::Operation, call: load_result)
      end

      before(:example) do
        allow(Operations::Data::Exists)
          .to receive(:new)
          .and_return(exists_operation)

        allow(Operations::Data::Clone)
          .to receive(:new)
          .and_return(clone_operation)

        allow(Operations::Data::Load)
          .to receive(:new)
          .and_return(load_operation)
      end

      it 'should check if the data directory is a repository' do
        task.invoke(source)

        expect(exists_operation)
          .to have_received(:call)
          .with(directory_name: repository)
      end

      it 'should use the configured ssh key' do
        task.invoke(source)

        expect(Operations::Data::Clone)
          .to have_received(:new)
          .with(ssh_key: '.ssh/deploy_rsa')
      end

      it 'should clone the repository' do
        task.invoke(source)

        expect(clone_operation)
          .to have_received(:call)
          .with(organization: organization, repository: repository)
      end

      context 'when the clone operation fails' do
        let(:clone_result) { Cuprum::Result.new(status: :failure) }

        it 'should not load the fixture data' do
          task.invoke(source)

          expect(load_operation).not_to have_received(:call)
        end
      end

      context 'when the clone operation succeeds' do
        let(:clone_result) { Cuprum::Result.new(status: :success) }

        it 'should load the fixture data' do
          task.invoke(source)

          expect(load_operation)
            .to have_received(:call)
            .with(directory_name: repository)
        end
      end
    end

    context 'when the data directory is a repository' do
      let(:exists_result) { Cuprum::Result.new(status: :success) }
      let(:pull_result)   { Cuprum::Result.new(status: :success) }
      let(:load_result)   { Cuprum::Result.new(status: :success) }
      let(:exists_operation) do
        instance_double(Cuprum::Operation, call: exists_result)
      end
      let(:pull_operation) do
        instance_double(Cuprum::Operation, call: pull_result)
      end
      let(:load_operation) do
        instance_double(Cuprum::Operation, call: load_result)
      end

      before(:example) do
        allow(Operations::Data::Exists)
          .to receive(:new)
          .and_return(exists_operation)

        allow(Operations::Data::Pull)
          .to receive(:new)
          .and_return(pull_operation)

        allow(Operations::Data::Load)
          .to receive(:new)
          .and_return(load_operation)
      end

      it 'should check if the data directory is a repository' do
        task.invoke(source)

        expect(exists_operation)
          .to have_received(:call)
          .with(directory_name: repository)
      end

      it 'should use the configured ssh key' do
        task.invoke(source)

        expect(Operations::Data::Pull)
          .to have_received(:new)
          .with(ssh_key: '.ssh/deploy_rsa')
      end

      it 'should pull the latest commit' do
        task.invoke(source)

        expect(pull_operation)
          .to have_received(:call)
          .with(repository: repository)
      end

      context 'when the pull operation fails' do
        let(:pull_result) { Cuprum::Result.new(status: :failure) }

        it 'should not load the fixture data' do
          task.invoke(source)

          expect(load_operation).not_to have_received(:call)
        end
      end

      context 'when the pull operation succeeds' do
        let(:pull_result) { Cuprum::Result.new(status: :success) }

        it 'should load the fixture data' do
          task.invoke(source)

          expect(load_operation)
            .to have_received(:call)
            .with(directory_name: repository)
        end
      end
    end
  end
end
