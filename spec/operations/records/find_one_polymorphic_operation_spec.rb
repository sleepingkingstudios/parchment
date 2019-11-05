# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_one_polymorphic_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::FindOnePolymorphicOperation do
  include Spec::Support::Examples::OperationExamples

  shared_context 'when initialized with an association name' do
    subject(:operation) do
      described_class.new(association_name: association_name)
    end

    let(:association_name) { 'widget' }
  end

  subject(:operation) { described_class.new }

  describe '#initialize' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:association_name)
    end
  end

  describe '#call' do
    let(:record) { FactoryBot.build(:book) }
    let(:id)     { record.id }
    let(:type)   { record&.class&.name }
    let(:params) { { id: id, type: type } }

    def call_operation
      operation.call(params)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should validate the foreign key', :id

    include_examples 'should validate the foreign type', :type

    describe 'with an invalid foreign key' do
      let(:id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { id: id },
          record_class: Book
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with a valid foreign key' do
      before(:example) { record.save! }

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(record)
      end
    end

    wrap_context 'when initialized with an association name' do
      let(:widget_id)   { record.id }
      let(:widget_type) { record&.class&.name }
      let(:params)      { { id: widget_id, type: widget_type } }

      include_examples 'should validate the foreign key', :widget_id

      include_examples 'should validate the foreign type', :widget_type

      describe 'with an invalid foreign key' do
        let(:widget_id) { '00000000-0000-0000-0000-000000000000' }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { widget_id: widget_id },
            record_class: Book
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with a valid foreign key' do
        before(:example) { record.save! }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(record)
        end
      end
    end
  end
end
