# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_polymorphic_association_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::FindPolymorphicAssociationOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class, association_name) }

  let(:association_name) { :source }
  let(:record_class)     { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(2).arguments }
  end

  describe '::subclass' do
    let(:subclass)  { described_class.subclass(record_class) }
    let(:operation) { subclass.new(association_name) }
    let(:expected)  do
      "Operations::Records::FindPolymorphicAssociation#{record_class}Operation"
    end

    it { expect(described_class).to respond_to(:subclass).with(1).argument }

    it { expect(subclass).to be_a Class }

    it { expect(subclass).to be < described_class }

    it { expect(subclass).to be_constructible.with(1).argument }

    it { expect(subclass.name).to be == expected }

    it { expect(operation.association_name).to be association_name }

    it { expect(operation.record_class).to be record_class }
  end

  describe '#call' do
    let(:attributes) do
      {
        source_id:   '00000000-0000-0000-0000-000000000000',
        source_type: 'Publication'
      }
    end

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should handle an invalid association name'

    include_examples 'should validate the attributes'

    describe 'when the foreign key is nil' do
      let(:attributes) { super().merge(source_id: nil) }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_id', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign key is empty' do
      let(:attributes) { super().merge(source_id: '') }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_id', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign key is not a String' do
      let(:attributes) { super().merge(source_id: 0) }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_id', 'must be a String']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type is nil' do
      let(:attributes) { super().merge(source_type: nil) }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type is empty' do
      let(:attributes) { super().merge(source_type: '') }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type is not a String' do
      let(:attributes) { super().merge(source_type: 0) }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', 'must be a String']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type is not a valid class name' do
      let(:attributes) { super().merge(source_type: 'Grimoire') }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', 'is invalid']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type is not a valid record class name' do
      let(:attributes) { super().merge(source_type: 'Object') }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', 'is invalid']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign type does not define the inverse association' do
      let(:attributes) { super().merge(source_type: 'Spell') }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['source_type', 'is invalid']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign key and foreign type are nil' do
      let(:attributes) { super().merge(source_id: nil, source_type: nil) }

      it 'should have a passing result' do
        expect(call_operation)
          .to have_passing_result.with_value(nil)
      end
    end

    describe 'when the foreign key is invalid' do
      let(:source_id)  { '00000000-0000-0000-0000-000000000000' }
      let(:attributes) { super().merge(source_id: source_id) }
      let(:expected_error) do
        Errors::NotFound
          .new(attributes: { id: source_id }, record_class: Publication)
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_error)
      end
    end

    describe 'when the foreign key is valid' do
      let(:publication) { FactoryBot.create(:publication) }
      let(:source_id)   { publication.id }
      let(:attributes)  { super().merge(source_id: source_id) }

      it 'should have a passing result' do
        expect(call_operation)
          .to have_passing_result.with_value(publication)
      end
    end
  end

  describe '#association_name' do
    include_examples 'should have reader',
      :association_name,
      -> { association_name }
  end

  describe '#operation_factory_for' do
    it 'should define the private method' do
      expect(operation)
        .to respond_to(:operation_factory_for, true)
        .with(1).argument
    end

    describe 'with a class that does not define :Factory' do
      let(:factory) { operation.send :operation_factory_for, Object }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Object }
    end

    describe 'with a class that defines :Factory' do
      let(:factory) { operation.send :operation_factory_for, Spell }

      it { expect(factory).to be_a Operations::Records::Factory }

      it { expect(factory.record_class).to be Spell }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
