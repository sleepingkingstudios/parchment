# frozen_string_literal: true

require 'rails_helper'

require 'operations/data/exists'

RSpec.describe Operations::Data::Exists do
  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:directory_name)  { 'secrets' }
    let(:directory_path)  { Rails.root.join 'data', directory_name }
    let(:repository_path) { directory_path.join '.git' }

    before(:example) { allow(Dir).to receive(:exist?).and_return(false) }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:directory_name)
    end

    context 'when the directory does not exist' do
      let(:expected_error) do
        message = "Directory does not exist - #{directory_path.to_s.inspect}"

        Cuprum::Error.new(message: message)
      end

      it 'should check if the directory exists' do
        operation.call(directory_name: directory_name)

        expect(Dir).to have_received(:exist?).with(directory_path)
      end

      it 'should return a failing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the directory is not a git repository' do
      let(:expected_error) do
        message =
          "Directory is not a git repository - #{directory_path.to_s.inspect}"

        Cuprum::Error.new(message: message)
      end

      before(:example) do
        allow(Dir).to receive(:exist?).with(directory_path).and_return(true)
      end

      it 'should check if the directory exists' do
        operation.call(directory_name: directory_name)

        expect(Dir).to have_received(:exist?).with(directory_path)
      end

      it 'should check if the directory is a git repository' do
        operation.call(directory_name: directory_name)

        expect(Dir).to have_received(:exist?).with(repository_path)
      end

      it 'should return a failing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the directory exists and is a git repository' do
      before(:example) do
        allow(Dir).to receive(:exist?).with(directory_path).and_return(true)

        allow(Dir).to receive(:exist?).with(repository_path).and_return(true)
      end

      it 'should check if the directory exists' do
        operation.call(directory_name: directory_name)

        expect(Dir).to have_received(:exist?).with(directory_path)
      end

      it 'should check if the directory is a git repository' do
        operation.call(directory_name: directory_name)

        expect(Dir).to have_received(:exist?).with(repository_path)
      end

      it 'should return a passing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_passing_result
          .with_value(true)
      end
    end
  end
end
