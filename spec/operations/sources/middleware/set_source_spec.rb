# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/middleware/set_source'

require 'support/examples/operation_examples'

RSpec.describe Operations::Sources::Middleware::SetSource do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }
  let(:reference)    { FactoryBot.build(:spell) }
  let(:next_result)  { Cuprum::Result.new(value: reference) }
  let(:next_command) { instance_double(Cuprum::Command, call: next_result) }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '.subclass' do
    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:subclass)
        .with(1).argument
        .and_keywords(:as)
    end

    def build_subclass(as: nil)
      described_class.subclass(record_class, as: as)
    end

    include_examples 'should define a subclass for the record class'
  end

  include_examples 'should define a #transaction method'

  describe '#call' do
    shared_examples 'should call the next operation' do
      it { expect(call_operation).to be == next_result }

      it 'should call the next operation' do
        call_operation

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected)
      end

      describe 'with additional keywords' do
        let(:keywords) { { ichi: 1, ni: 2, san: 3 } }

        it { expect(call_operation).to be == next_result }

        it 'should call the next operation' do
          call_operation

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected, **keywords)
        end
      end
    end

    subject(:operation) do
      described_class.new(record_class).curry(next_command)
    end

    let(:attributes) { {} }
    let(:keywords)   { {} }
    let(:expected)   { attributes }

    def call_operation
      operation.call(attributes: attributes, **keywords)
    end

    before(:example) { reference.save! }

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes)
        .and_any_keywords
    end

    describe 'with attributes: nil' do
      let(:attributes) { nil }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: an Object' do
      let(:attributes) { Object.new.freeze }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: an empty Hash' do
      let(:attributes) { {} }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: a Hash with invalid attributes' do
      let(:attributes) { FactoryBot.attributes_for(:spell).merge(name: nil) }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: a Hash with valid attributes' do
      shared_examples 'should call the set source operation' do
        let(:set_source_result) { Cuprum::Result.new(value: reference) }
        let(:set_source_operation) do
          instance_double(Cuprum::Operation, call: set_source_result)
        end

        it 'should call the set source operation' do
          allow(Operations::Sources::SetSourceOperation)
            .to receive(:new)
            .and_return(set_source_operation)

          call_operation

          expect(set_source_operation)
            .to have_received(:call)
            .with(reference: reference, **origin_attributes)
        end
      end

      let(:reference_attributes) { FactoryBot.attributes_for(:spell) }
      let(:origin_attributes)    { {} }
      let(:attributes) do
        reference_attributes.merge(**origin_attributes)
      end
      let(:expected) { reference_attributes }

      describe 'with no origin attributes' do
        include_examples 'should call the next operation'

        include_examples 'should call the set source operation'

        it 'should not set the source' do
          reference = call_operation.value

          expect(reference.source).to be nil
        end
      end

      describe 'with an invalid origin id and type' do
        let(:origin_attributes) do
          {
            origin_id:   '00000000-0000-0000-0000-000000000000',
            origin_type: 'Book'
          }
        end

        it { expect(call_operation).to have_failing_result }

        it 'should call the next operation' do
          call_operation

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected)
        end

        include_examples 'should call the set source operation'
      end

      describe 'with an invalid origin' do
        let(:origin)            { FactoryBot.build(:book) }
        let(:origin_attributes) { { origin: origin } }

        it { expect(call_operation).to have_failing_result }

        it 'should call the next operation' do
          call_operation

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected)
        end

        include_examples 'should call the set source operation'
      end

      describe 'with a valid origin id and type' do
        let(:origin) { FactoryBot.build(:book) }
        let(:origin_attributes) do
          { origin_id: origin.id, origin_type: 'Book' }
        end

        before(:example) { origin.save! }

        include_examples 'should call the next operation'

        include_examples 'should call the set source operation'

        it 'should set the source', :aggregate_failures do
          reference = call_operation.value

          expect(reference.source).to be_a Source
          expect(reference.source.origin).to be == origin
        end
      end

      describe 'with a valid origin' do
        let(:origin)            { FactoryBot.build(:book) }
        let(:origin_attributes) { { origin: origin } }

        before(:example) { origin.save! }

        include_examples 'should call the next operation'

        include_examples 'should call the set source operation'

        it 'should set the source', :aggregate_failures do
          reference = call_operation.value

          expect(reference.source).to be_a Source
          expect(reference.source.origin).to be == origin
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
