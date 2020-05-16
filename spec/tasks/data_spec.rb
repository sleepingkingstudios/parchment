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
    let(:directory) { 'secrets' }
    let(:task)      { Rake::Task['data:load'].tap(&:reenable) }

    before(:example) { allow(Fixtures).to receive(:create) }

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

    context 'when the data does not exist' do
      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)
      end

      it 'should not load the data' do
        task.invoke(directory)

        expect(Fixtures).not_to have_received(:create)
      end
    end

    context 'when some of the data exists' do
      let(:record_classes) { [Spell] }

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)
        allow(Fixtures)
          .to receive(:exist?)
          .with(Spell, data_path: directory)
          .and_return(true)
      end

      it 'should load the existing data from /data/secrets' do
        task.invoke(directory)

        record_classes.each do |record_class|
          expect(Fixtures)
            .to have_received(:create)
            .with(record_class, data_path: directory)
            .ordered
        end
      end
    end

    context 'when all of the data exists' do
      let(:record_classes) do
        [
          Authentication::User,
          Book,
          Mechanics::Action,
          Spell
        ]
      end

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(true)
      end

      it 'should load the existing data from /data/secrets' do
        task.invoke(directory)

        record_classes.each do |record_class|
          expect(Fixtures)
            .to have_received(:create)
            .with(record_class, data_path: directory)
            .ordered
        end
      end
    end
  end

  describe 'data:load:fixtures' do
    let(:task) { Rake::Task['data:load:fixtures'].tap(&:reenable) }

    before(:example) { allow(Fixtures).to receive(:create) }

    include_examples 'should list the task',
      'data:load:fixtures',
      'Loads the data from /data/fixtures into the database'

    context 'when the data does not exist' do
      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)
      end

      it 'should not load the data' do
        task.invoke

        expect(Fixtures).not_to have_received(:create)
      end
    end

    context 'when some of the data exists' do
      let(:record_classes) { [Spell] }

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)
        allow(Fixtures).to receive(:exist?).with(Spell).and_return(true)
      end

      it 'should load the existing data from /data/fixtures' do
        task.invoke

        record_classes.each do |record_class|
          expect(Fixtures).to have_received(:create).with(record_class).ordered
        end
      end
    end

    context 'when all of the data exists' do
      let(:record_classes) do
        [
          Authentication::User,
          Book,
          Mechanics::Action,
          Spell
        ]
      end

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(true)
      end

      it 'should load the existing data from /data/fixtures' do
        task.invoke

        record_classes.each do |record_class|
          expect(Fixtures).to have_received(:create).with(record_class).ordered
        end
      end
    end
  end

  describe 'data:pull' do
    let(:organization)  { 'example_organization' }
    let(:repository)    { 'example_repository' }
    let(:source)        { "#{organization}/#{repository}" }
    let(:task)          { Rake::Task['data:pull'].tap(&:reenable) }

    context 'when the data directory is not a repository' do
      let(:exists_result) { Cuprum::Result.new(status: :failure) }
      let(:clone_result)  { Cuprum::Result.new(status: :success) }
      let(:exists_operation) do
        instance_double(Cuprum::Operation, call: exists_result)
      end
      let(:clone_operation) do
        instance_double(Cuprum::Operation, call: clone_result)
      end

      before(:example) do
        allow(Operations::Data::Exists)
          .to receive(:new)
          .and_return(exists_operation)

        allow(Operations::Data::Clone)
          .to receive(:new)
          .and_return(clone_operation)
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
    end

    context 'when the data directory is a repository' do
      let(:exists_result) { Cuprum::Result.new(status: :success) }
      let(:pull_result)   { Cuprum::Result.new(status: :success) }
      let(:exists_operation) do
        instance_double(Cuprum::Operation, call: exists_result)
      end
      let(:pull_operation) do
        instance_double(Cuprum::Operation, call: pull_result)
      end

      before(:example) do
        allow(Operations::Data::Exists)
          .to receive(:new)
          .and_return(exists_operation)

        allow(Operations::Data::Pull)
          .to receive(:new)
          .and_return(pull_operation)
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
    end
  end
end
