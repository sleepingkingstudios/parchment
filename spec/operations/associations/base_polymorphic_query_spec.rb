# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/base_polymorphic_query'

RSpec.describe Operations::Associations::BasePolymorphicQuery do
  subject(:operation) do
    described_class.new(
      association_name: association_name,
      resource_class:   resource_class
    )
  end

  let(:association_name) { 'source' }
  let(:resource_class)   { Spell }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:association_name, :resource_class)
    end
  end

  describe '#association' do
    include_examples 'should define private reader',
      :association,
      -> { resource_class.reflections[association_name] }
  end

  describe '#association_name' do
    include_examples 'should define reader',
      :association_name,
      -> { association_name }
  end

  describe '#foreign_key_name' do
    include_examples 'should define private reader',
      :foreign_key_name,
      'source_id'
  end

  describe '#foreign_type_name' do
    include_examples 'should define private reader',
      :foreign_type_name,
      'source_type'
  end

  describe '#operation_factory_for' do
    it 'should define the private method' do
      expect(operation)
        .to respond_to(:operation_factory_for, true)
        .with(1).argument
    end

    describe 'with a class that does not define :Factory' do
      let(:factory) { operation.send :operation_factory_for, Object }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Object }
    end

    describe 'with a class that defines :Factory' do
      let(:factory) { operation.send :operation_factory_for, Spell }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Spell }
    end
  end

  describe '#resource_class' do
    include_examples 'should define reader', :resource_class, Spell
  end
end
