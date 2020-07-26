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
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::AssignOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::GenerateSlug)
        )
    }

  include_examples 'should define operation',
    :build,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::BuildOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::GenerateSlug)
        )
    }

  include_examples 'should define operation',
    :create,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::CreateOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::GenerateSlug)
        )
    }

  include_examples 'should define operation',
    :find_one,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::FindOneOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::FindBySlug)
        )
    }

  include_examples 'should define operation',
    :update,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::UpdateOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::GenerateSlug)
        )
    }
end
