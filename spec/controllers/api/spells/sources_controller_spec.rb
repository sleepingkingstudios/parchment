# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Spells::SourcesController do
  let(:controller) { described_class.new }

  describe '::SOURCE_TYPES' do
    include_examples 'should define immutable constant',
      :SOURCE_TYPES,
      %w[Publication]
  end

  describe '#operation_factory_for' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:operation_factory_for, true)
        .with(1).argument
    end

    describe 'with a class that does not define :Factory' do
      let(:factory) { controller.send :operation_factory_for, Object }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Object }
    end

    describe 'with a class that defines :Factory' do
      let(:factory) { controller.send :operation_factory_for, Spell }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Spell }
    end
  end
end
