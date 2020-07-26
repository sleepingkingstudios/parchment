# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/middleware/find_by_slug'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::Middleware::FindBySlug do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:next_result)  { Cuprum::Result.new(value: 'value') }
  let(:next_command) { instance_double(Cuprum::Command, call: next_result) }
  let(:record_class) { Book }

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

    include_examples 'should define a subclass'
  end

  describe '#call' do
    shared_examples 'should call the next operation' do
      it { expect(call_operation.result).to be == next_result }

      it 'should call the next operation' do
        call_operation

        expect(next_command)
          .to have_received(:call)
          .with(primary_key, as: :id)
      end

      describe 'with as: value' do
        let(:options) { { as: :primary_key } }

        it { expect(call_operation.result).to be == next_result }

        it 'should call the next operation' do
          call_operation

          expect(next_command)
            .to have_received(:call)
            .with(primary_key, **options)
        end
      end
    end

    let(:primary_key) { '00000000-0000-0000-0000-000000000000' }
    let(:options)     { {} }

    def call_operation
      operation.call(next_command, primary_key, **options)
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(2).arguments
        .and_keywords(:as)
    end

    describe 'with primary key: nil' do
      let(:primary_key) { nil }

      include_examples 'should call the next operation'
    end

    describe 'with primary key: an Object' do
      let(:primary_key) { Object.new }

      include_examples 'should call the next operation'
    end

    describe 'with primary key: an empty string' do
      let(:primary_key) { '' }

      include_examples 'should call the next operation'
    end

    describe 'with primary key: an lowercase UUID' do
      let(:primary_key) { '01234567-89ab-cdef-0123-456789abcdef' }

      include_examples 'should call the next operation'
    end

    describe 'with primary key: an uppercase UUID' do
      let(:primary_key) { '01234567-89AB-CDEF-0123-456789ABCDEF' }

      include_examples 'should call the next operation'
    end

    describe 'with an invalid slug' do
      let(:primary_key) { 'invalid-slug' }
      let(:expected_errors) do
        Errors::NotFound.new(
          attributes:   { slug: primary_key },
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

      describe 'with an invalid slug' do
        let(:primary_key) { 'invalid-slug' }
        let(:expected_errors) do
          Errors::NotFound.new(
            attributes:   { slug: primary_key },
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_errors)
        end
      end

      describe 'with a valid slug' do
        let(:record)      { records.first }
        let(:primary_key) { record.slug }

        it 'should have a passing result' do
          expect(call_operation)
            .to have_passing_result
            .with_value(record)
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
