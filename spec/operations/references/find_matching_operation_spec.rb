# frozen_string_literal: true

require 'rails_helper'

require 'operations/references/find_matching_operation'

RSpec.describe Operations::References::FindMatchingOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    def call_operation(options = {})
      operation.call(**options)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    it { expect(call_operation).to have_passing_result.with_value([]) }

    context 'when there are many records' do
      let(:record_attributes) do
        [
          {
            name:       'Cunning Plot',
            school:     Spell::Schools::DIVINATION,
            created_at: 1.day.ago
          },
          {
            name:       'Blast Off',
            school:     Spell::Schools::EVOCATION,
            created_at: 3.days.ago
          },
          {
            name:       'Arcane Eye',
            school:     Spell::Schools::DIVINATION,
            created_at: 2.days.ago
          }
        ]
      end
      let!(:records) do
        record_attributes.map { |hsh| FactoryBot.create(:spell, hsh) }
      end
      let(:expected) do
        records.sort_by(&:created_at).reverse
      end

      it 'should find the matching records and sort by created_at' do
        expect(call_operation)
          .to have_passing_result
          .with_value(expected)
      end

      describe 'with order: empty Hash' do
        let(:options) { { order: {} } }

        it 'should find the matching records and sort by created_at' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      describe 'with order: Hash' do
        let(:order)   { { name: :asc } }
        let(:options) { { order: order } }
        let(:expected) do
          records.sort_by(&:name)
        end

        it 'should find the matching records and apply the ordering' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      describe 'with where: empty Hash' do
        let(:options) { { where: {} } }

        it 'should find the matching records and sort by created_at' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      describe 'with where: Hash' do
        let(:query)   { { school: Spell::Schools::DIVINATION } }
        let(:options) { { where: query } }
        let(:expected) do
          super().select { |spell| spell.school == Spell::Schools::DIVINATION }
        end

        it 'should find the matching records and sort by created_at' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      describe 'with multiple options' do
        let(:query)   { { school: Spell::Schools::DIVINATION } }
        let(:order)   { { name: :asc } }
        let(:options) { { order: order, where: query } }
        let(:expected) do
          records
            .select { |spell| spell.school == Spell::Schools::DIVINATION }
            .sort_by(&:name)
        end

        it 'should find the matching records and apply the ordering' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      context 'when the records have sources' do
        let(:sources) do
          records.map do |record|
            FactoryBot.build(:source, :with_book, reference: record)
          end
        end

        before(:example) { sources.each(&:save!) }

        it 'should find the matching records' do
          expect(call_operation)
            .to have_passing_result
            .with_value(expected)
        end

        it 'should assign the sources' do
          expect(call_operation.value.map(&:source))
            .to contain_exactly(*sources)
        end

        it 'should warm the association cache' do
          expect(call_operation.value)
            .to all(satisfy { |record| record.association_cached?(:source) })
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
