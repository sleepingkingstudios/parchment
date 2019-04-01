# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/build_operation'

RSpec.describe Operations::Records::BuildOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { nil }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { call_operation.value }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(0..1).arguments }

    describe 'with no arguments' do
      def call_operation
        operation.call
      end

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to be == expected }
    end

    describe 'with nil' do
      let(:attributes)      { nil }
      let(:expected_errors) { ['attributes', 'must be a Hash'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an Object' do
      let(:attributes)      { Object.new }
      let(:expected_errors) { [['attributes', 'must be a Hash']] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end
    end

    describe 'with an empty hash' do
      let(:attributes) { {} }

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to be == expected }
    end

    describe 'with a hash with invalid attributes' do
      let(:attributes) do
        {
          'difficulty' => 'high',
          'element'    => 'radiance',
          'explosion'  => 'megacolossal'
        }
      end
      let(:expected_errors) { [['difficulty', 'unknown attribute']] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end
    end

    describe 'with a hash with valid attributes' do
      let(:attributes) do
        {
          'name'         => 'The Blessing of Yevon',
          'casting_time' => '1 action',
          'description'  => 'It must be the blessing of Yevon!'
        }
      end
      let(:expected) { super().merge(attributes) }

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to be == expected }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
