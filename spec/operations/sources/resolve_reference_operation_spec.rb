# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/resolve_reference_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'

RSpec.describe Operations::Sources::ResolveReferenceOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples

  subject(:operation) { described_class.new }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:reference)      { FactoryBot.build(:spell) }
    let(:reference_id)   { reference.id }
    let(:reference_type) { reference&.class&.name }
    let(:attributes)     { {} }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should resolve the polymorphic association',
      :reference,
      permitted_types: { not: Book }

    Source::REFERENCE_TYPES.each do |permitted_type|
      factory_type =
        permitted_type
        .underscore
        .split('/')
        .last
        .intern

      context "when the reference is a #{permitted_type}" do
        let(:reference) { FactoryBot.build(factory_type) }

        describe 'with a valid foreign key and type' do
          let(:attributes) do
            super().merge(
              reference_id:   reference.id,
              reference_type: permitted_type
            )
          end

          before(:example) { reference.save! }

          it 'should have a passing result' do
            expect(call_operation)
              .to have_passing_result
              .with_value(be == reference)
          end
        end

        describe 'with a persisted association' do
          let(:attributes) { super().merge(reference: reference) }

          before(:example) { reference.save! }

          it 'should have a passing result' do
            expect(call_operation)
              .to have_passing_result
              .with_value(be == reference)
          end
        end
      end
    end
  end
end
