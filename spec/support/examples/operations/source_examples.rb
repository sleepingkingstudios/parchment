# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples/operation_examples'
require 'support/examples/operations'

module Spec::Support::Examples::Operations
  module SourceExamples
    extend  RSpec::SleepingKingStudios::Concerns::SharedExampleGroup
    include Spec::Support::Examples::OperationExamples

    shared_examples 'should validate the origin' do |allow_nil: false|
      unless allow_nil
        describe 'with a nil origin' do
          let(:origin) { nil }
          let(:expected_error) do
            Errors::Sources::InvalidOrigin.new
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result.with_error(expected_error)
          end
        end
      end

      describe 'with a non-origin record' do
        let(:origin) { FactoryBot.build(:spell) }
        let(:expected_error) do
          Errors::Sources::InvalidOrigin.new
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result.with_error(expected_error)
        end
      end
    end

    shared_examples 'should update the source metadata' do
      describe 'when the origin is a Book' do
        let(:book_attributes) do
          {
            title:    'On The Origin of Flumphs',
            playtest: false
          }
        end
        let(:book)   { FactoryBot.build(:book, book_attributes) }
        let(:origin) { book }
        let(:expected) do
          {
            'name'     => book.title,
            'playtest' => book.playtest
          }
        end

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result
        end

        it 'should update the metadata' do
          call_operation

          expect(source.metadata).to be == expected
        end

        it 'should update the name property' do
          call_operation

          expect(source.name).to be == book.title
        end

        it 'should update the playtest property' do
          call_operation

          expect(source.playtest?).to be == book.playtest
        end

        context 'when the source has metadata' do
          let(:metadata) do
            {
              'name'     => 'Flumphs Unearthed',
              'playtest' => true,
              'other'    => { 'nested' => 'value' }
            }
          end
          let(:expected) do
            {
              'name'     => book.title,
              'playtest' => book.playtest,
              'other'    => { 'nested' => 'value' }
            }
          end

          before(:example) { source.metadata = metadata }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result
          end

          it 'should update the metadata' do
            call_operation

            expect(source.metadata).to be == expected
          end

          it 'should update the name property' do
            call_operation

            expect(source.name).to be == book.title
          end

          it 'should update the playtest property' do
            call_operation

            expect(source.playtest?).to be == book.playtest
          end
        end

        context 'when the book has playtest: true' do
          let(:book_attributes) { super().merge(playtest: true) }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result
          end

          it 'should update the metadata' do
            call_operation

            expect(source.metadata).to be == expected
          end

          it 'should update the name property' do
            call_operation

            expect(source.name).to be == book.title
          end

          it 'should update the playtest property' do
            call_operation

            expect(source.playtest?).to be == book.playtest
          end
        end
      end
    end
  end
end
