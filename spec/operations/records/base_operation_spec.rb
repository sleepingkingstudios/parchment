# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/base_operation'

RSpec.describe Operations::Records::BaseOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call) }

    it 'should raise an error' do
      expect { operation.call }
        .to raise_error Cuprum::Errors::ProcessNotImplementedError
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
