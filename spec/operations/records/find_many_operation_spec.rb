# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_many_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::FindManyOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    def call_operation(**options)
      operation.call(ids, **options)
    end

    describe 'with nil primary keys array' do
      let(:ids) { nil }
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with an Object primary keys array' do
      let(:ids) { { ids: [] } }
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids', 'must be an Array']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with an empty primary keys array' do
      let(:ids) { [] }
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with a nil primary key' do
      let(:ids) do
        [
          '00000000-0000-0000-0000-000000000000',
          nil,
          '00000000-0000-0000-0000-000000000001'
        ]
      end
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids.1', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with a primary key Object' do
      let(:ids) do
        [
          '00000000-0000-0000-0000-000000000000',
          Object.new.freeze,
          '00000000-0000-0000-0000-000000000001'
        ]
      end
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids.1', 'must be a String']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with an empty primary key' do
      let(:ids) do
        [
          '00000000-0000-0000-0000-000000000000',
          '',
          '00000000-0000-0000-0000-000000000001'
        ]
      end
      let(:expected_errors) do
        Errors::InvalidParameters
          .new(errors: [['ids.1', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with an invalid primary key' do
      let(:ids) { ['00000000-0000-0000-0000-000000000000'] }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { ids: ids },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end

      describe 'with allow_partial: true' do
        it 'should have a passing result with an empty array' do
          expect(call_operation allow_partial: true)
            .to have_passing_result.with_value([])
        end
      end
    end

    describe 'with an array of invalid primary keys' do
      let(:ids) do
        [
          '00000000-0000-0000-0000-000000000000',
          '00000000-0000-0000-0000-000000000001',
          '00000000-0000-0000-0000-000000000002'
        ]
      end
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { ids: ids },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end

      describe 'with allow_partial: true' do
        it 'should have a passing result with an empty array' do
          expect(call_operation allow_partial: true)
            .to have_passing_result.with_value([])
        end
      end
    end

    context 'when there are many records' do
      let!(:records) do
        Array.new(3) { FactoryBot.create(:spell) }
      end

      describe 'with an invalid primary key' do
        let(:ids) { ['00000000-0000-0000-0000-000000000000'] }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { ids: ids },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with allow_partial: true' do
          it 'should have a passing result with an empty array' do
            expect(call_operation allow_partial: true)
              .to have_passing_result.with_value([])
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      describe 'with a valid primary key' do
        let(:ids) { [records.first.id] }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value([records.first])
        end
      end

      describe 'with an array of invalid primary keys' do
        let(:ids) do
          [
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000002'
          ]
        end
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { ids: ids },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with allow_partial: true' do
          it 'should have a passing result with an empty array' do
            expect(call_operation allow_partial: true)
              .to have_passing_result.with_value([])
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      describe 'with an array of mixed invalid and valid primary keys' do
        let(:invalid_ids) do
          [
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000002'
          ]
        end
        let(:valid_ids) { records.map(&:id) }
        let(:ids) { invalid_ids + valid_ids }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { ids: invalid_ids },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with allow_partial: true' do
          it 'should have a passing result with the found records' do
            expect(call_operation allow_partial: true)
              .to have_passing_result.with_value(records)
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      describe 'with an array of valid primary keys' do
        let(:ids) { records.map(&:id) }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(records)
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
