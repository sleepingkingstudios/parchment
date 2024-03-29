# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_by_slug_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::FindBySlugOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Book }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:slug) { nil }

    def call_operation
      operation.call(slug)
    end

    it { expect(operation).to respond_to(:call).with(1..2).arguments }

    describe 'with a nil slug' do
      let(:slug) { nil }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['slug', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object slug' do
      let(:slug) { Object.new.freeze }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['slug', 'must be a String']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty string slug' do
      let(:slug) { '' }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['slug', "can't be blank"]])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an invalid slug' do
      let(:slug) { '---' }
      let(:expected_error) do
        Errors::InvalidParameters
          .new(errors: [['slug', 'is invalid']])
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a valid slug' do
      let(:slug) { 'custom-slug' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { 'slug' => slug },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a non-normalized slug' do
      let(:slug) { 'slug-of-customization' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { 'slug' => slug },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a non-slug string' do
      let(:slug) { 'Custom Name' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { 'slug' => 'custom-name' },
          record_class: record_class
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when there are many records' do
      let(:records) do
        Array.new(3) { FactoryBot.build(:book) }
      end

      before(:example) { records.each(&:save!) }

      describe 'with a valid slug' do
        let(:slug) { records.first.slug }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(records.first)
        end
      end

      describe 'with a non-normalized slug' do
        let(:slug) { 'slug-of-customization' }

        before(:example) do
          records.first.update(slug: slug)
        end

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(records.first)
        end
      end

      describe 'with a non-slug string' do
        let(:slug) { records.first.title }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(records.first)
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
