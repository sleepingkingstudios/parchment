# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/base_operation'

RSpec.describe Operations::Records::BaseOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '::subclass' do
    let(:subclass)  { described_class.subclass(record_class) }
    let(:operation) { subclass.new }
    let(:expected)  { "Operations::Records::Base#{record_class}Operation" }

    it { expect(described_class).to respond_to(:subclass).with(1).argument }

    it { expect(subclass).to be_a Class }

    it { expect(subclass).to be < described_class }

    it { expect(subclass).to be_constructible.with(0).arguments }

    it { expect(subclass.name).to be == expected }

    it { expect(operation.record_class).to be record_class }

    context 'when the parent class has constructor arguments' do
      let(:described_class) { Spec::CustomOperation }
      let(:arguments)       { %w[ichi ni san] }
      let(:keywords)        { { yon: 4, go: 5, roku: 6 } }
      let(:operation)       { subclass.new(*arguments, **keywords) }

      # rubocop:disable RSpec/DescribedClass
      example_class 'Spec::CustomOperation',
        Operations::Records::BaseOperation \
      do |klass|
        klass.define_method(:initialize) do |record_class, *args, **kwargs|
          super(record_class)

          @arguments = args
          @keywords  = kwargs
        end

        klass.send(:attr_reader, :arguments)
        klass.send(:attr_reader, :keywords)
      end
      # rubocop:enable RSpec/DescribedClass

      it { expect(subclass).to be_a Class }

      it { expect(subclass).to be < described_class }

      it 'should define the constructor' do
        expect(subclass)
          .to be_constructible
          .with(1).argument
          .and_unlimited_arguments
      end

      it { expect(operation.record_class).to be record_class }

      it { expect(operation.arguments).to be == arguments }

      it { expect(operation.keywords).to be == keywords }
    end

    context 'when the parent class has a custom name' do
      let(:described_class) { Spec::RandomizeOperation }
      let(:expected)        { "Spec::Randomize#{record_class}Operation" }

      # rubocop:disable RSpec/DescribedClass
      example_class 'Spec::RandomizeOperation',
        Operations::Records::BaseOperation
      # rubocop:enable RSpec/DescribedClass

      it { expect(subclass.name).to be == expected }
    end
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call) }

    it 'should return a failing result' do
      expect(operation.call).to be_a_failing_result
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  describe '#transaction' do
    let(:transaction_status) do
      Struct.new(:in_transaction, :rollback).new(false, false)
    end

    before(:example) do
      allow(record_class).to receive(:transaction) do |&block|
        transaction_status.in_transaction = true

        begin
          block.call
        rescue ActiveRecord::Rollback
          transaction_status.rollback = true
        end

        transaction_status.in_transaction = false
      end
    end

    it { expect(operation).to respond_to(:transaction, true).with(0).arguments }

    it 'should yield the block' do
      expect { |block| operation.send(:transaction, &block) }
        .to yield_control
    end

    it 'should execute the block inside a transaction' do
      operation.send(:transaction) do
        expect(transaction_status.in_transaction).to be true
      end
    end

    context 'when the block has a failing step' do
      let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
      let(:result) { Cuprum::Result.new(error: error) }

      it 'should return the result' do
        expect(operation.send(:transaction) { operation.send :step, result })
          .to be == result
      end

      it 'should roll back the transaction' do
        operation.send(:transaction) { operation.send :step, result }

        expect(transaction_status.rollback).to be true
      end
    end

    context 'when the block has a passing step' do
      let(:value)  { Object.new.freeze }
      let(:result) { Cuprum::Result.new(value: value) }

      it 'should return the result' do
        expect(operation.send(:transaction) { operation.send :step, result })
          .to be == result
      end

      it 'should not roll back the transaction' do
        operation.send(:transaction) { operation.send :step, result }

        expect(transaction_status.rollback).to be false
      end
    end
  end
end
