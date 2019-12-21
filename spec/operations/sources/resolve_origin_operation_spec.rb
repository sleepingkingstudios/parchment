# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/resolve_origin_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'

RSpec.describe Operations::Sources::ResolveOriginOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples

  subject(:operation) { described_class.new }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:origin)      { FactoryBot.build(:book) }
    let(:origin_id)   { origin.id }
    let(:origin_type) { origin&.class&.name }
    let(:attributes)  { {} }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should resolve the polymorphic association',
      :origin,
      permitted_types: { not: Spell }

    Source::ORIGIN_TYPES.each do |permitted_type|
      factory_type = permitted_type.underscore.intern

      context "when the origin is a #{permitted_type}" do
        let(:origin) { FactoryBot.build(factory_type) }

        describe 'with a valid foreign key and type' do
          let(:attributes) do
            super().merge(origin_id: origin.id, origin_type: permitted_type)
          end

          before(:example) { origin.save! }

          it 'should have a passing result' do
            expect(call_operation)
              .to have_passing_result
              .with_value(be == origin)
          end
        end

        describe 'with a persisted association' do
          let(:attributes) { super().merge(origin: origin) }

          before(:example) { origin.save! }

          it 'should have a passing result' do
            expect(call_operation)
              .to have_passing_result
              .with_value(be == origin)
          end
        end
      end
    end
  end
end
