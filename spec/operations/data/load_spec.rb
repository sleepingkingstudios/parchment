# frozen_string_literal: true

require 'rails_helper'

require 'operations/data/load'

RSpec.describe Operations::Data::Load do
  describe '::AUTHENTICATION_MODELS' do
    let(:expected) do
      %w[
        Authentication::User
      ]
    end

    include_examples 'should define frozen constant',
      :AUTHENTICATION_MODELS,
      -> { expected }
  end

  describe '::DATA_MODELS' do
    let(:expected) do
      %w[
        Mechanics::Action
        Spell
      ]
    end

    include_examples 'should define frozen constant',
      :DATA_MODELS,
      -> { expected }
  end

  describe '::SOURCE_MODELS' do
    let(:expected) do
      %w[
        Book
      ]
    end

    include_examples 'should define frozen constant',
      :SOURCE_MODELS,
      -> { expected }
  end

  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:directory_name) { 'secrets' }

    before(:example) { allow(Fixtures).to receive(:create) }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:directory_name)
    end

    describe 'with directory_name: nil' do
      let(:expected_error) do
        Cuprum::Error.new(message: "Directory can't be blank")
      end

      it 'should return a failing result' do
        expect(operation.call(directory_name: nil))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with directory_name: an Object' do
      let(:expected_error) do
        Cuprum::Error.new(message: 'Directory must be a string')
      end

      it 'should return a failing result' do
        expect(operation.call(directory_name: Object.new.freeze))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with directory_name: an empty string' do
      let(:expected_error) do
        Cuprum::Error.new(message: "Directory can't be blank")
      end

      it 'should return a failing result' do
        expect(operation.call(directory_name: ''))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the data does not exist' do
      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)
      end

      it 'should return a passing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_passing_result
      end

      it 'should not load the data' do
        operation.call(directory_name: directory_name)

        expect(Fixtures).not_to have_received(:create)
      end
    end

    context 'when some of the data exists' do
      let(:expected_models) do
        %w[
          Book
          Spell
        ]
      end

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(false)

        expected_models.each do |expected_model|
          allow(Fixtures)
            .to receive(:exist?)
            .with(expected_model.constantize, data_path: directory_name)
            .and_return(true)
        end
      end

      it 'should return a passing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_passing_result
      end

      it 'should load each existing data model in order', :aggregate_failures do
        operation.call(directory_name: directory_name)

        expected_models.each do |expected_model|
          expect(Fixtures)
            .to have_received(:create)
            .with(expected_model.constantize, data_path: directory_name)
            .ordered
        end
      end
    end

    context 'when the data exists' do
      let(:expected_models) do
        [
          *described_class::AUTHENTICATION_MODELS,
          *described_class::SOURCE_MODELS,
          *described_class::DATA_MODELS
        ]
      end

      before(:example) do
        allow(Fixtures).to receive(:exist?).and_return(true)
      end

      it 'should return a passing result' do
        expect(operation.call(directory_name: directory_name))
          .to have_passing_result
      end

      it 'should load each data model in order', :aggregate_failures do
        operation.call(directory_name: directory_name)

        expected_models.each do |expected_model|
          expect(Fixtures)
            .to have_received(:create)
            .with(expected_model.constantize, data_path: directory_name)
            .ordered
        end
      end
    end
  end
end
