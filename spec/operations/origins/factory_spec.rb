# frozen_string_literal: true

require 'rails_helper'

require 'operations/origins/factory'

require 'support/examples/operation_factory_examples'

RSpec.describe Operations::Origins::Factory do
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
    Operations::Origins::AssignOperation

  include_examples 'should define operation',
    :build,
    Operations::Origins::BuildOperation

  include_examples 'should define operation',
    :create,
    Operations::Origins::CreateOperation

  include_examples 'should define operation',
    :find_one,
    Operations::Origins::FindOneOperation

  include_examples 'should define operation',
    :update,
    Operations::Origins::UpdateOperation
end
