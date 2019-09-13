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