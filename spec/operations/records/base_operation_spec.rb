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

    context 'when the parent class has a custom name' do
      let(:name)     { 'Spec::Operations::RandomizeOperation' }
      let(:expected) { "Spec::Operations::Randomize#{record_class}Operation" }

      before(:example) do
        allow(described_class).to receive(:name).and_return(name)
      end

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
end
