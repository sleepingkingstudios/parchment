# frozen_string_literal: true

require 'rails_helper'

require 'operations/origins/find_one_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Origins::FindOneOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:id) { nil }

    def call_operation
      operation.call(id)
    end

    it { expect(operation).to respond_to(:call).with(1..2).arguments }

    include_examples 'should validate the primary key'

    describe 'with an invalid primary key' do
      let(:id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { id: id },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_error(expected_errors)
      end
    end

    describe 'with an invalid slug' do
      let(:id) { 'invalid-slug' }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { slug: id },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_errors)
      end
    end

    context 'when there are many records' do
      let(:records) do
        Array.new(3) { FactoryBot.build(:book) }
      end

      before(:example) { records.each(&:save!) }

      describe 'with an invalid primary key' do
        let(:id) { '00000000-0000-0000-0000-000000000000' }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { id: id },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_errors)
        end
      end

      describe 'with an invalid slug' do
        let(:id) { 'invalid-slug' }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { slug: id },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

      describe 'with a valid primary key' do
        let(:record) { records.first }
        let(:id)     { record.id }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(record)
        end
      end

      describe 'with a valid slug' do
        let(:record) { records.first }
        let(:id)     { record.slug }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(record)
        end
      end

      describe 'with as: :custom_id' do
        def call_operation
          operation.call(id, as: :custom_id)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with an invalid primary key' do
          let(:id) { '00000000-0000-0000-0000-000000000000' }
          let(:expected_errors) do
            Errors::NotFound.new(
              attributes:   { custom_id: id },
              record_class: record_class
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_errors)
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
