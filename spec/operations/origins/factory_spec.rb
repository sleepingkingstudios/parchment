# frozen_string_literal: true

require 'rails_helper'

require 'operations/origins/factory'

require 'support/examples/operation_factory_examples'

RSpec.describe Operations::Origins::Factory do
  include Spec::Support::Examples::OperationFactoryExamples

  subject(:factory) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  include_examples 'should define operation',
    :assign,
    -> { be_a_subclass_of(Operations::Origins::AssignOperation) }

  include_examples 'should define operation',
    :build,
    -> { be_a_subclass_of(Operations::Origins::BuildOperation) }

  include_examples 'should define operation',
    :create,
    -> { be_a_subclass_of(Operations::Origins::CreateOperation) }

  include_examples 'should define operation',
    :find_one,
    -> { be_a_subclass_of(Operations::Origins::FindOneOperation) }

  include_examples 'should define operation',
    :update,
    -> { be_a_subclass_of(Operations::Origins::UpdateOperation) }
end
