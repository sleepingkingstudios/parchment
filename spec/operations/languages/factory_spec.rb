# frozen_string_literal: true

require 'rails_helper'

require 'operations/languages/factory'

require 'support/examples/operation_factory_examples'

RSpec.describe Operations::Languages::Factory do
  include Spec::Support::Examples::OperationFactoryExamples

  subject(:factory) { described_class.new }

  let(:record_class) { References::Language }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, References::Language
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
          a_subclass_of(Operations::Records::Middleware::GenerateSlug),
          a_subclass_of(Operations::Sources::Middleware::SetSource)
        )
    }

  include_examples 'should define operation',
    :destroy,
    -> { be_a_subclass_of(Operations::Records::DestroyOperation) }

  include_examples 'should define operation',
    :find_many,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::FindManyOperation)
        )
        .and_middleware(
          a_subclass_of(
            Operations::Associations::Middleware::CacheOne,
            association_name: :source
          )
        )
    }

  include_examples 'should define operation',
    :find_matching,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::FindMatchingOperation)
        )
        .and_middleware(
          a_subclass_of(
            Operations::Associations::Middleware::CacheOne,
            association_name: :source
          )
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
          a_subclass_of(Operations::Records::Middleware::FindBySlug),
          a_subclass_of(
            Operations::Associations::Middleware::CacheOne,
            association_name: :source
          ),
          a_subclass_of(
            Operations::Associations::Middleware::CacheOne,
            association_name: :parent_language
          ),
          a_subclass_of(
            Operations::Associations::Middleware::CacheMany,
            association_name: :dialects
          )
        )
    }

  include_examples 'should define operation',
    :save,
    -> { be_a_subclass_of(Operations::Records::SaveOperation) }

  include_examples 'should define operation',
    :update,
    lambda {
      be_applied_middleware
        .with_command(
          a_subclass_of(Operations::Records::UpdateOperation)
        )
        .and_middleware(
          a_subclass_of(Operations::Records::Middleware::GenerateSlug),
          a_subclass_of(Operations::Sources::Middleware::SetSource)
        )
    }
end
