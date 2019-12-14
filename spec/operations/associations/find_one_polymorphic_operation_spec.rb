# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/find_one_polymorphic_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Associations::FindOnePolymorphicOperation do
  include Spec::Support::Examples::OperationExamples

  shared_context 'when initialized with a prefix' do
    let(:prefix) { 'widget' }

    before(:example) { options.update(as: prefix) }
  end

  shared_context 'when initialized with a types array of classes' do
    let(:permitted_types) { [Book] }

    before(:example) { options.update(permitted_types: permitted_types) }
  end

  shared_context 'when initialized with a types array of strings' do
    let(:permitted_types) { %w[Book] }

    before(:example) { options.update(permitted_types: permitted_types) }
  end

  subject(:operation) { described_class.new(**options) }

  let(:options) { {} }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:as, :permitted_types)
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

    wrap_context 'when initialized with a prefix' do
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

    wrap_context 'when initialized with a types array of classes' do
      include_examples 'should validate the foreign key', :id

      include_examples 'should validate the foreign type', :type

      describe 'with an unexpected foreign type' do
        let(:record) { FactoryBot.build(:spell) }
        let(:expected_errors) do
          Errors::InvalidParameters.new(
            errors: [['type', 'is not a valid type']]
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

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

      wrap_context 'when initialized with a prefix' do
        describe 'with an unexpected foreign type' do
          let(:record) { FactoryBot.build(:spell) }
          let(:expected_errors) do
            Errors::InvalidParameters.new(
              errors: [['widget_type', 'is not a valid widget type']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result.with_error(expected_errors)
          end
        end
      end
    end

    wrap_context 'when initialized with a types array of strings' do
      include_examples 'should validate the foreign key', :id

      include_examples 'should validate the foreign type', :type

      describe 'with an unexpected foreign type' do
        let(:record) { FactoryBot.build(:spell) }
        let(:expected_errors) do
          Errors::InvalidParameters.new(
            errors: [['type', 'is not a valid type']]
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_errors)
        end
      end

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

      wrap_context 'when initialized with a prefix' do
        describe 'with an unexpected foreign type' do
          let(:record) { FactoryBot.build(:spell) }
          let(:expected_errors) do
            Errors::InvalidParameters.new(
              errors: [['widget_type', 'is not a valid widget type']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result.with_error(expected_errors)
          end
        end
      end
    end
  end
end
