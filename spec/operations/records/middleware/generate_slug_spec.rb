# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/middleware/generate_slug'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::Middleware::GenerateSlug do
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

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes)
        .and_any_keywords
    end

    describe 'with attributes: nil' do
      it { expect(operation.call(attributes: nil)).to be == next_result }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: an empty Hash' do
      let(:attributes) { {} }

      include_examples 'should call the next operation'
    end

    describe 'with attributes: a hash with string keys' do
      let(:attributes) do
        {
          'publication_date' => Date.new(1982, 7, 9),
          'publisher_name'   => 'Master Control Program'
        }
      end

      include_examples 'should call the next operation'

      context 'when the hash has a title' do
        let(:attributes) { super().merge('title' => 'Greetings, programs!') }
        let(:expected)   { super().merge(slug: 'greetings-programs') }

        include_examples 'should call the next operation'
      end

      context 'when the hash has a title and a slug' do
        let(:attributes) do
          super().merge(
            'slug'  => 'custom-slug',
            'title' => 'Greetings, programs!'
          )
        end

        include_examples 'should call the next operation'
      end
    end

    describe 'with attributes: a hash with symbol keys' do
      let(:attributes) do
        {
          publication_date: Date.new(1982, 7, 9),
          publisher_name:   'Master Control Program'
        }
      end

      include_examples 'should call the next operation'

      context 'when the hash has a title' do
        let(:attributes) { super().merge(title: 'Greetings, programs!') }
        let(:expected)   { super().merge(slug:  'greetings-programs') }

        include_examples 'should call the next operation'
      end

      context 'when the hash has a title and a slug' do
        let(:attributes) do
          super().merge(
            slug:  'custom-slug',
            title: 'Greetings, programs!'
          )
        end

        include_examples 'should call the next operation'
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
