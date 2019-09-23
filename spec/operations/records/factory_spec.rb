# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/factory'

require 'support/examples/operation_factory_examples'

RSpec.describe Operations::Records::Factory do
  include Spec::Support::Examples::OperationFactoryExamples

  subject(:factory) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  describe '::FindPolymorphicAssociation' do
    let(:association_name) { :source }
    let(:operation_class)  { factory::FindPolymorphicAssociation }
    let(:operation)        { operation_class.new(association_name) }
    let(:parent_class) do
      Operations::Records::FindPolymorphicAssociationOperation
    end

    it { expect(factory).to define_constant(:FindPolymorphicAssociation) }

    it { expect(operation_class).to be_a Class }

    it { expect(operation_class).to be <= parent_class }

    it { expect(operation_class).to be_constructible.with(1).argument }

    it { expect(operation.association_name).to be association_name }

    it { expect(operation.record_class).to be record_class }
  end

  describe 'find_polymorphic_association' do
    let(:association_name) { :source }
    let(:operation) do
      factory.find_polymorphic_association(association_name)
    end
    let(:parent_class) do
      Operations::Records::FindPolymorphicAssociationOperation
    end

    it 'should define the method' do
      expect(factory)
        .to respond_to(:find_polymorphic_association)
        .with(1).argument
    end

    it { expect(operation).to be_a parent_class }

    it { expect(operation.association_name).to be association_name }

    it { expect(operation.record_class).to be record_class }
  end

  include_examples 'should define operation',
    :assign,
    Operations::Records::AssignOperation

  include_examples 'should define operation',
    :build,
    Operations::Records::BuildOperation

  include_examples 'should define operation',
    :create,
    Operations::Records::CreateOperation

  include_examples 'should define operation',
    :destroy,
    Operations::Records::DestroyOperation

  include_examples 'should define operation',
    :find_many,
    Operations::Records::FindManyOperation

  include_examples 'should define operation',
    :find_matching,
    Operations::Records::FindMatchingOperation

  include_examples 'should define operation',
    :find_one,
    Operations::Records::FindOneOperation

  include_examples 'should define operation',
    :save,
    Operations::Records::SaveOperation

  include_examples 'should define operation',
    :update,
    Operations::Records::UpdateOperation
end
