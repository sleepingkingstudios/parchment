# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/cache_many_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Associations::CacheManyOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) do
    described_class.new(record_class, association_name: association_name)
  end

  let(:association_name) { :dialects }
  let(:record_class)     { References::Language }
  let(:association) do
    record_class.reflections[association_name.to_s]
  end
  let(:inverse_association) do
    association.inverse_of
  end

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:association_name)
    end

    describe 'with an invalid association name' do
      let(:association_name) { :invalid_association }
      let(:error_message) do
        "#{record_class.name} does not define association" \
        " #{association_name.inspect}"
      end

      it 'should raise an exception' do
        expect do
          described_class.new(record_class, association_name: association_name)
        end
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#association' do
    include_examples 'should have private reader',
      :association,
      -> { association }
  end

  describe '#association_name' do
    include_examples 'should have private reader',
      :association_name,
      -> { association_name }
  end

  describe '#call' do
    let(:invalid_record_error) do
      Errors::InvalidRecord.new(record_class: record_class)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      it 'should return a failing result' do
        expect(operation.call(nil))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with an object' do
      it 'should return a failing result' do
        expect(operation.call(Object.new.freeze))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with an invalid record' do
      it 'should return a failing result' do
        expect(operation.call(Source.new))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with an empty array' do
      it 'should return a passing result with an empty array' do
        expect(operation.call([])).to have_passing_result.with_value([])
      end
    end

    describe 'with an array with nil' do
      it 'should return a failing result' do
        expect(operation.call([nil]))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with an array with an object' do
      it 'should return a failing result' do
        expect(operation.call([Object.new.freeze]))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with an array with an invalid record' do
      it 'should return a failing result' do
        expect(operation.call([Source.new]))
          .to have_failing_result
          .with_error(invalid_record_error)
      end
    end

    describe 'with a record' do
      let(:record) { FactoryBot.build(:language) }

      before(:example) { record.save! }

      context 'when the record does not have any associated records' do
        it 'should return a passing result with the record' do
          expect(operation.call(record))
            .to have_passing_result
            .with_value(record)
        end

        it 'should not assign the association' do
          result = operation.call(record)

          expect(result.value.send(association_name)).to be == []
        end

        it 'should warm the association cache' do
          expect { operation.call(record) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end

      context 'when the record has one associated record' do
        let(:associated_records) do
          Array.new(1) do
            FactoryBot.build(:language, parent_language: record)
          end
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the record' do
          expect(operation.call(record))
            .to have_passing_result
            .with_value(record)
        end

        it 'should assign the associated record' do
          result = operation.call(record)

          expect(result.value.send(association_name))
            .to contain_exactly(*associated_records)
        end

        it 'should warm the association cache' do
          expect { operation.call(record) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end

      context 'when the record has many associated records' do
        let(:associated_records) do
          Array.new(3) do
            FactoryBot.build(:language, parent_language: record)
          end
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the record' do
          expect(operation.call(record))
            .to have_passing_result
            .with_value(record)
        end

        it 'should assign the associated record' do
          result = operation.call(record)

          expect(result.value.send(association_name))
            .to contain_exactly(*associated_records)
        end

        it 'should warm the association cache' do
          expect { operation.call(record) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end
    end

    describe 'with an array with one record' do
      let(:record) { FactoryBot.build(:language) }

      before(:example) { record.save! }

      context 'when the record does not have any associated records' do
        it 'should return a passing result with the record' do
          expect(operation.call([record]))
            .to have_passing_result
            .with_value([record])
        end

        it 'should not assign the association', :aggregate_failures do
          result = operation.call([record])

          result.value.each do |item|
            expect(item.send(association_name)).to be == []
          end
        end

        it 'should warm the association cache' do
          expect { operation.call([record]) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end

      context 'when the record has one associated record' do
        let(:associated_records) do
          Array.new(1) do
            FactoryBot.build(:language, parent_language: record)
          end
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the record' do
          expect(operation.call([record]))
            .to have_passing_result
            .with_value([record])
        end

        it 'should assign the associated record', :aggregate_failures do
          result = operation.call([record])

          result.value.each do |item|
            expected = associated_records.select do |associated_record|
              associated_record.parent_language_id == item.id
            end

            expect(item.send(association_name)).to contain_exactly(*expected)
          end
        end

        it 'should warm the association cache' do
          expect { operation.call([record]) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end

      context 'when the record has many associated records' do
        let(:associated_records) do
          Array.new(3) do
            FactoryBot.build(:language, parent_language: record)
          end
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the record' do
          expect(operation.call([record]))
            .to have_passing_result
            .with_value([record])
        end

        it 'should assign the associated records', :aggregate_failures do
          result = operation.call([record])

          result.value.each do |item|
            expected = associated_records.select do |associated_record|
              associated_record.parent_language_id == item.id
            end

            expect(item.send(association_name)).to contain_exactly(*expected)
          end
        end

        it 'should warm the association cache' do
          expect { operation.call([record]) }
            .to change { record.association_cached?(association_name) }
            .to be true
        end
      end
    end

    describe 'with an array with many records' do
      let(:records) { Array.new(3) { FactoryBot.build(:language) } }

      before(:example) { records.each(&:save!) }

      context 'when the records do not have any associated records' do
        it 'should return a passing result with the records' do
          expect(operation.call(records))
            .to have_passing_result
            .with_value(records)
        end

        it 'should not assign the association', :aggregate_failures do
          result = operation.call(records)

          result.value.each do |item|
            expect(item.send(association_name)).to be == []
          end
        end

        it 'should warm the association cache', :aggregate_failures do
          expect(records).to all(
            satisfy { |record| !record.association_cached?(association_name) }
          )

          operation.call(records)

          expect(records).to all(
            satisfy { |record| record.association_cached?(association_name) }
          )
        end
      end

      context 'when the records each have one associated record' do
        let(:associated_records) do
          records
            .map do |record|
              Array.new(1) do
                FactoryBot.build(:language, parent_language: record)
              end
            end
            .flatten
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the records' do
          expect(operation.call(records))
            .to have_passing_result
            .with_value(records)
        end

        it 'should assign the associated records', :aggregate_failures do
          result = operation.call(records)

          result.value.each do |item|
            expected = associated_records.select do |associated_record|
              associated_record.parent_language_id == item.id
            end

            expect(item.send(association_name)).to contain_exactly(*expected)
          end
        end

        it 'should warm the association cache', :aggregate_failures do
          expect(records).to all(
            satisfy { |record| !record.association_cached?(association_name) }
          )

          operation.call(records)

          expect(records).to all(
            satisfy { |record| record.association_cached?(association_name) }
          )
        end
      end

      context 'when the records each have many associated records' do
        let(:associated_records) do
          records
            .map do |record|
              Array.new(3) do
                FactoryBot.build(:language, parent_language: record)
              end
            end
            .flatten
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the records' do
          expect(operation.call(records))
            .to have_passing_result
            .with_value(records)
        end

        it 'should assign the associated records', :aggregate_failures do
          result = operation.call(records)

          result.value.each do |item|
            expected = associated_records.select do |associated_record|
              associated_record.parent_language_id == item.id
            end

            expect(item.send(association_name)).to contain_exactly(*expected)
          end
        end

        it 'should warm the association cache', :aggregate_failures do
          expect(records).to all(
            satisfy { |record| !record.association_cached?(association_name) }
          )

          operation.call(records)

          expect(records).to all(
            satisfy { |record| record.association_cached?(association_name) }
          )
        end
      end

      context 'when the records have different numbers of associated records' do
        let(:associated_records) do
          records
            .zip([1, 0, 3])
            .map do |(record, count)|
              Array.new(count) do
                FactoryBot.build(:language, parent_language: record)
              end
            end
            .flatten
        end

        before(:example) { associated_records.map(&:save!) }

        it 'should return a passing result with the records' do
          expect(operation.call(records))
            .to have_passing_result
            .with_value(records)
        end

        it 'should assign the associated records', :aggregate_failures do
          result = operation.call(records)

          result.value.each do |item|
            expected = associated_records.select do |associated_record|
              associated_record.parent_language_id == item.id
            end

            expect(item.send(association_name)).to contain_exactly(*expected)
          end
        end

        it 'should warm the association cache', :aggregate_failures do
          expect(records).to all(
            satisfy { |record| !record.association_cached?(association_name) }
          )

          operation.call(records)

          expect(records).to all(
            satisfy { |record| record.association_cached?(association_name) }
          )
        end
      end
    end
  end

  describe '#foreign_key_name' do
    include_examples 'should have private reader',
      :foreign_key_name,
      -> { association.foreign_key }
  end

  describe '#foreign_type_name' do
    include_examples 'should have private reader',
      :foreign_type_name,
      -> { association.type }
  end

  describe '#inverse_association' do
    include_examples 'should have private reader',
      :inverse_association,
      -> { inverse_association }
  end

  describe '#inverse_class' do
    include_examples 'should have private reader',
      :inverse_class,
      -> { inverse_association.active_record }
  end
end
