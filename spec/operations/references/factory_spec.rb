# frozen_string_literal: true

require 'rails_helper'

require 'operations/references/factory'

require 'support/examples/operation_factory_examples'

RSpec.describe Operations::References::Factory do
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
    -> { be_a_subclass_of(Operations::References::AssignOperation) }

  include_examples 'should define operation',
    :build,
    -> { be_a_subclass_of(Operations::References::BuildOperation) }

  include_examples 'should define operation',
    :create,
    -> { be_a_subclass_of(Operations::References::CreateOperation) }

  include_examples 'should define operation',
    :destroy,
    -> { be_a_subclass_of(Operations::Records::DestroyOperation) }

  include_examples 'should define operation',
    :find_many,
    -> { be_a_subclass_of(Operations::References::FindManyOperation) }

  include_examples 'should define operation',
    :find_matching,
    -> { be_a_subclass_of(Operations::References::FindMatchingOperation) }

  include_examples 'should define operation',
    :find_one,
    -> { be_a_subclass_of(Operations::References::FindOneOperation) }

  include_examples 'should define operation',
    :save,
    -> { be_a_subclass_of(Operations::Records::SaveOperation) }

  include_examples 'should define operation',
    :update,
    -> { be_a_subclass_of(Operations::References::UpdateOperation) }
end
