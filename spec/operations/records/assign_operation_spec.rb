# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/assign_operation'

RSpec.describe Operations::Records::AssignOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { {} }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { record_class.new }

    def call_operation
      operation.call(record, attributes)
    end

    it { expect(operation).to respond_to(:call).with(2).arguments }

    describe 'with nil attributes' do
      let(:attributes)      { nil }
      let(:expected_errors) { ['attributes', 'must be a Hash'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an attributes Object' do
      let(:attributes)      { Object.new }
      let(:expected_errors) { [['attributes', 'must be a Hash']] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end
    end

    describe 'with a nil record' do
      let(:record)          { nil }
      let(:expected_errors) { ['record', 'must be a Spell'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with a record Object' do
      let(:record)          { Object.new }
      let(:expected_errors) { ['record', 'must be a Spell'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with a hash with unknown attributes' do
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

      it { expect { call_operation }.not_to change(record, :attributes) }
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

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it 'should update the attributes' do
        expect { call_operation }
          .to change(record, :attributes)
          .to be >= attributes
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
