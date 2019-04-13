# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_one_operation'

RSpec.describe Operations::Records::FindOneOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:id) { nil }

    def call_operation
      operation.call(id)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:id) { nil }
      let(:expected_errors) { ['id', "can't be blank"] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an Object' do
      let(:id) { Object.new }
      let(:expected_errors) { ['id', 'must be a String'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an empty String' do
      let(:id) { '' }
      let(:expected_errors) { ['id', "can't be blank"] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an invalid id' do
      let(:id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_errors) { ['spell', 'not found'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    context 'when there are many records' do
      let!(:records) do
        Array.new(3) { FactoryBot.create(:spell) }
      end

      describe 'with an invalid id' do
        let(:id)              { '00000000-0000-0000-0000-000000000000' }
        let(:expected_errors) { ['spell', 'not found'] }

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_errors(expected_errors)
        end
      end

      describe 'with a valid id' do
        let(:record) { records.first }
        let(:id)     { record.id }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result.with_value(record)
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end