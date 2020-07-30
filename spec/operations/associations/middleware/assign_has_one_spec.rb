# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/middleware/assign_has_one'

require 'support/examples/operation_examples'

RSpec.describe Operations::Associations::Middleware::AssignHasOne do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) do
    described_class.new(record_class, association_name: association_name)
  end

  let(:record_class)       { Spell }
  let(:association_name)   { :source }
  let(:constructor_kwargs) { { association_name: association_name } }
  let(:next_result)        { Cuprum::Result.new(value: nil) }
  let(:next_command) do
    instance_double(Cuprum::Command, call: next_result)
  end

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:association_name)
    end
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

  describe '#association_name' do
    include_examples 'should have reader',
      :association_name,
      -> { association_name }
  end

  describe '#call' do
    shared_examples 'should call the next operation' do
      it 'should call the next operation' do
        call_operation

        expect(next_command)
          .to have_received(:call)
          .with(no_args)
      end

      describe 'with arguments and keywords' do
        let(:arguments) { %i[uno dos tres] }
        let(:keywords)  { { ichi: 1, ni: 2, san: 3 } }

        it 'should call the next operation' do
          call_operation(*arguments, **keywords)

          expect(next_command)
            .to have_received(:call)
            .with(*arguments, **keywords)
        end
      end
    end

    subject(:operation) do
      described_class
        .new(record_class, association_name: association_name)
        .curry(next_command)
    end

    def call_operation(*arguments, **keywords)
      if keywords.empty?
        operation.call(*arguments)
      else
        operation.call(*arguments, **keywords)
      end
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with_unlimited_arguments
        .and_any_keywords
    end

    context 'when the next command returns a failing result' do
      let(:next_result) { Cuprum::Result.new(status: :failure) }

      include_examples 'should call the next operation'

      it { expect(call_operation).to be == next_result }
    end

    context 'when the next command returns a result with no records' do
      let(:next_result) { Cuprum::Result.new(value: []) }

      include_examples 'should call the next operation'

      it { expect(call_operation).to be == next_result }
    end

    context 'when the next command returns a result with one record' do
      let(:record)      { FactoryBot.build(:spell) }
      let(:next_result) { Cuprum::Result.new(value: record) }

      before(:example) { record.save! }

      include_examples 'should call the next operation'

      it { expect(call_operation).to be == next_result }

      context 'when the record has an associated record' do
        let(:target) do
          FactoryBot.build(:source, :with_book, reference: record)
        end

        before(:example) { target.save! }

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it { expect(call_operation.value.source).to be == target }

        it 'should cache the association' do
          result = call_operation

          expect(result.value.association_cached?(association_name)).to be true
        end
      end
    end

    context 'when the next command returns a result with many records' do
      let(:records)     { FactoryBot.build_list(:spell, 3) }
      let(:next_result) { Cuprum::Result.new(value: records) }

      before(:example) { records.map(&:save!) }

      include_examples 'should call the next operation'

      it { expect(call_operation).to be == next_result }

      context 'when the records have associated records' do
        let(:targets) do
          records.map do |record|
            FactoryBot.build(:source, :with_book, reference: record)
          end
        end

        before(:example) { targets.map(&:save!) }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(contain_exactly(*records))
        end

        it 'should set the associations' do
          expect(call_operation.value).to all(satisfy do |value|
            record = records.find { |item| item.id == value.id }

            value.source == record.source
          end)
        end

        it 'should cache the associations' do
          expect(call_operation.value).to all(satisfy do |value|
            value.association_cached?(association_name)
          end)
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
