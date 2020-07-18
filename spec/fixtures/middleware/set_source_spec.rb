# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/middleware/set_source'

require 'support/examples/operation_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Fixtures::Middleware::SetSource do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:middleware) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:origin) do
      title = data.fetch('source', {}).fetch('title', 'In The Arms of a Flumph')

      FactoryBot.build(:book, title: title)
    end
    let(:origin_type)  { 'Book' }
    let(:reference)    { FactoryBot.build(:spell) }
    let(:next_result)  { Cuprum::Result.new(value: reference) }
    let(:next_command) { instance_double(Cuprum::Command, call: next_result) }
    let(:curried)      { middleware.curry(next_command) }
    let(:data) do
      {
        'name'   => 'Noodly Appendages',
        'source' => {
          'title' => "The Flumph Fancier's Handbook",
          'type'  => origin_type
        }
      }
    end
    let(:expected_data) { data.except('source') }

    def call_operation
      curried.call(attributes: data)
    end

    before(:example) do
      origin.save!
      reference.save! if reference.is_a?(ApplicationRecord)
    end

    context 'when the returned value is a Hash' do
      let(:next_result) { Cuprum::Result.new(value: expected_data) }

      it 'should call the next command sans the source data' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the data' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(expected_data)
      end
    end

    context 'when the returned value is not persisted' do
      let(:next_result) { Cuprum::Result.new(value: FactoryBot.build(:spell)) }

      it 'should call the next command sans the source data' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the value' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(next_result.value)
      end
    end

    include_examples 'should validate the reference'

    include_examples 'should validate the foreign type', :origin_type

    context 'when the data does not include source data' do
      let(:data) { { 'name' => 'Noodly Appendages' } }

      it 'should call the next command' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the reference' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(reference)
      end

      it 'should not create a source' do
        expect { call_operation }.not_to change(Source, :count)
      end
    end

    describe 'with an invalid foreign type' do
      let(:origin_type) { 'Spell' }
      let(:expected_error) do
        Errors::InvalidParameters.new(
          errors: [
            ['origin_type', 'is not a valid origin type']
          ]
        )
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    context 'when the origin does not exist' do
      let(:origin) do
        FactoryBot.build(
          :book,
          title: 'Fantastic Flumphs and Where to Find Them'
        )
      end
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   data.fetch('source').except('type'),
          record_class: origin_type.constantize
        )
      end

      it 'should return a failing result' do
        expect(call_operation).to be_a_failing_result.with_error(expected_error)
      end
    end

    context 'when the origin is not unique' do
      let(:data) do
        source_data =
          super()
          .fetch('source')
          .merge('publisher_name' => 'Flumph Free Press')
          .tap { |hsh| hsh.delete('title') }

        super().merge('source' => source_data)
      end
      let(:origins) do
        Array.new(3) do
          FactoryBot.build(
            :book,
            publisher_name: data.dig('source', 'publisher_name')
          )
        end
      end
      let(:expected_error) do
        Errors::NotUnique.new(
          attributes:   data.fetch('source').except('type'),
          record_class: origin_type.constantize,
          records:      origins
        )
      end

      before(:example) do
        origins.each(&:save!)
      end

      it 'should return a failing result' do
        expect(call_operation).to be_a_failing_result.with_error(expected_error)
      end
    end

    it 'should call the next command sans the source data' do
      curried.call(attributes: data)

      expect(next_command)
        .to have_received(:call)
        .with(attributes: expected_data)
    end

    it 'should return a result with the reference' do
      expect(call_operation)
        .to be_a_passing_result
        .with_value(reference)
    end

    it 'should create the source' do
      expect { call_operation }.to change(Source, :count).by(1)
    end

    it 'should set the source', :aggregate_failures do
      result = call_operation
      value  = result.value

      expect(value.source).to be_a(Source)
      expect(value.source.origin).to be == origin
      expect(value.source.metadata).to be == {
        'name'     => origin.title,
        'playtest' => origin.playtest
      }
    end

    context 'with metadata: Hash' do
      let(:data) do
        source_data =
          super()
          .fetch('source')
          .merge('metadata' => { 'page_number' => 50 })

        super().merge('source' => source_data)
      end

      context 'when the origin does not exist' do
        let(:origin) do
          FactoryBot.build(
            :book,
            title: 'Fantastic Flumphs and Where to Find Them'
          )
        end
        let(:expected_error) do
          Errors::NotFound.new(
            attributes:   data.fetch('source').except('metadata', 'type'),
            record_class: origin_type.constantize
          )
        end

        it 'should return a failing result' do
          expect(call_operation)
            .to be_a_failing_result
            .with_error(expected_error)
        end
      end

      context 'when the origin is not unique' do
        let(:data) do
          source_data =
            super()
            .fetch('source')
            .merge('publisher_name' => 'Flumph Free Press')
            .tap { |hsh| hsh.delete('title') }

          super().merge('source' => source_data)
        end
        let(:origins) do
          Array.new(3) do
            FactoryBot.build(
              :book,
              publisher_name: data.dig('source', 'publisher_name')
            )
          end
        end
        let(:expected_error) do
          Errors::NotUnique.new(
            attributes:   data.fetch('source').except('metadata', 'type'),
            record_class: origin_type.constantize,
            records:      origins
          )
        end

        before(:example) do
          origins.each(&:save!)
        end

        it 'should return a failing result' do
          expect(call_operation)
            .to be_a_failing_result
            .with_error(expected_error)
        end
      end

      it 'should call the next command sans the source data' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the reference' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(reference)
      end

      it 'should create the source' do
        expect { call_operation }.to change(Source, :count).by(1)
      end

      it 'should set the source', :aggregate_failures do
        metadata = data.dig('source', 'metadata')
        result   = call_operation
        value    = result.value

        expect(value.source).to be_a(Source)
        expect(value.source.origin).to be == origin
        expect(value.source.metadata).to be == metadata.merge(
          'name'     => origin.title,
          'playtest' => origin.playtest
        )
      end
    end
  end
end
