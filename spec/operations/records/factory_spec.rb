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

  describe '::for' do
    it { expect(described_class).to respond_to(:for).with(1).argument }

    describe 'with the name of a record class that does not define a factory' do
      let(:record_class) { ApplicationRecord }

      it 'should return an instance of the base factory class' do
        expect(described_class.for record_class.name).to be_a described_class
      end

      it 'should set the record class' do
        expect(described_class.for(record_class.name).record_class)
          .to be record_class
      end
    end

    describe 'with the name of a record class that defines a factory' do
      let(:record_class) { Spell }

      it 'should return the factory class for the record class' do
        expect(described_class.for record_class.name)
          .to be record_class::Factory
      end
    end

    describe 'with a record class that does not define a factory' do
      let(:record_class) { ApplicationRecord }

      it 'should return an instance of the base factory class' do
        expect(described_class.for record_class).to be_a described_class
      end

      it 'should set the record class' do
        expect(described_class.for(record_class).record_class)
          .to be record_class
      end
    end

    describe 'with a record class that defines a factory' do
      let(:record_class) { Spell }

      it 'should return the factory class for the record class' do
        expect(described_class.for record_class).to be record_class::Factory
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  include_examples 'should define operation',
    :assign,
    -> { be_a_subclass_of(Operations::Records::AssignOperation) }

  include_examples 'should define operation',
    :build,
    -> { be_a_subclass_of(Operations::Records::BuildOperation) }

  include_examples 'should define operation',
    :create,
    -> { be_a_subclass_of(Operations::Records::CreateOperation) }

  include_examples 'should define operation',
    :create_or_update,
    -> { be_a_subclass_of(Operations::Records::CreateOrUpdateOperation) }

  include_examples 'should define operation',
    :destroy,
    -> { be_a_subclass_of(Operations::Records::DestroyOperation) }

  include_examples 'should define operation',
    :find_many,
    -> { be_a_subclass_of(Operations::Records::FindManyOperation) }

  include_examples 'should define operation',
    :find_matching,
    -> { be_a_subclass_of(Operations::Records::FindMatchingOperation) }

  include_examples 'should define operation',
    :find_one,
    -> { be_a_subclass_of(Operations::Records::FindOneOperation) }

  include_examples 'should define operation',
    :save,
    -> { be_a_subclass_of(Operations::Records::SaveOperation) }

  include_examples 'should define operation',
    :update,
    -> { be_a_subclass_of(Operations::Records::UpdateOperation) }
end
