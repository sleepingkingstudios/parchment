# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/base_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::BaseOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '.subclass' do
    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(1).argument
        .and_keywords(:as)
    end

    def build_subclass(as: nil)
      described_class.subclass(record_class, as: as)
    end

    include_examples 'should define a subclass'
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
        expect(
          operation.send(:transaction) { operation.send(:step) { result } }
        )
          .to be == result
      end

      it 'should roll back the transaction' do
        operation.send(:transaction) { operation.send(:step) { result } }

        expect(transaction_status.rollback).to be true
      end
    end

    context 'when the block has a passing step' do
      let(:value)  { Object.new.freeze }
      let(:result) { Cuprum::Result.new(value: value) }

      it 'should return the result' do
        expect(
          operation.send(:transaction) { operation.send(:step) { result } }
        )
          .to be == result
      end

      it 'should not roll back the transaction' do
        operation.send(:transaction) { operation.send(:step) { result } }

        expect(transaction_status.rollback).to be false
      end
    end
  end
end
