# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/destroy_operation'

RSpec.describe Operations::Records::DestroyOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:record) { nil }

    def call_operation
      operation.call(record)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:record)          { nil }
      let(:expected_errors) { ['record', 'must be a Spell'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an Object' do
      let(:record)          { Object.new }
      let(:expected_errors) { ['record', 'must be a Spell'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with a record' do
      let!(:record) { FactoryBot.create(:spell) }

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it { expect { call_operation }.to change(Spell, :count).by(-1) }

      it 'should destroy the record' do
        expect { call_operation }.to change(record, :persisted?).to be false
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
