# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'

module Spec::Support::Examples
  module OperationExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should validate the attributes' do
      describe 'with nil attributes' do
        let(:attributes) { nil }
        let(:expected_errors) do
          Errors::InvalidParameters
            .new(errors: [['attributes', 'must be a Hash']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with an attributes Object' do
        let(:attributes) { Object.new }
        let(:expected_errors) do
          Errors::InvalidParameters
            .new(errors: [['attributes', 'must be a Hash']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end
    end

    shared_examples 'should validate the primary key' do
      describe 'with a nil primary key' do
        let(:id) { nil }
        let(:expected_errors) do
          Errors::InvalidParameters
            .new(errors: [['id', "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with a primary key Object' do
        let(:id) { Object.new }
        let(:expected_errors) do
          Errors::InvalidParameters
            .new(errors: [['id', 'must be a String']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with an empty primary key' do
        let(:id) { '' }
        let(:expected_errors) do
          Errors::InvalidParameters
            .new(errors: [['id', "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end
    end

    shared_examples 'should validate the record' do
      describe 'with a nil record' do
        let(:record) { nil }
        let(:expected_errors) do
          Errors::InvalidRecord.new(record_class: record_class)
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with a record Object' do
        let(:record) { Object.new }
        let(:expected_errors) do
          Errors::InvalidRecord.new(record_class: record_class)
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end
    end
  end
end
