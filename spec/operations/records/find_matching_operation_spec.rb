# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/find_matching_operation'

RSpec.describe Operations::Records::FindMatchingOperation do
  shared_context 'when initialized with optional: false' do
    before(:example) { constructor_options.update(optional: false) }
  end

  shared_context 'when initialized with unique: true' do
    before(:example) { constructor_options.update(unique: true) }
  end

  subject(:operation) do
    described_class.new(record_class, **constructor_options)
  end

  let(:constructor_options) { {} }
  let(:record_class)        { Spell }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:optional, :unique)
    end
  end

  describe '#call' do
    def call_operation(options = {})
      operation.call(**options)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    it { expect(call_operation).to have_passing_result.with_value([]) }

    wrap_context 'when initialized with optional: false' do
      let(:expected_error) do
        Errors::NotFound.new(attributes: {}, record_class: record_class)
      end

      it 'should return a failing result' do
        expect(call_operation).to have_failing_result.with_error(expected_error)
      end

      describe 'with where: empty Hash' do
        let(:options) { { where: {} } }

        it 'should return a failing result' do
          expect(call_operation options)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with where: Hash' do
        let(:query)   { { school: Spell::Schools::DIVINATION } }
        let(:options) { { where: query } }
        let(:expected_error) do
          Errors::NotFound.new(attributes: query, record_class: record_class)
        end

        it 'should return a failing result' do
          expect(call_operation options)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
    end

    wrap_context 'when initialized with unique: true' do
      it { expect(call_operation).to have_passing_result.with_value([]) }
    end

    context 'when there is one record' do
      let(:record_attributes) do
        {
          name:       'Cunning Plot',
          school:     Spell::Schools::DIVINATION,
          created_at: 1.day.ago
        }
      end
      let(:record)   { FactoryBot.build(:spell, record_attributes) }
      let(:expected) { [record] }

      before(:example) { record.save! }

      it 'should find the matching record' do
        expect(call_operation)
          .to have_passing_result
          .with_value(expected)
      end

      describe 'with where: empty Hash' do
        let(:options) { { where: {} } }

        it 'should find the matching record' do
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

        it 'should find the matching record' do
          expect(call_operation options)
            .to have_passing_result
            .with_value(expected)
        end
      end

      wrap_context 'when initialized with optional: false' do
        it 'should find the matching record' do
          expect(call_operation)
            .to have_passing_result
            .with_value(expected)
        end
      end

      wrap_context 'when initialized with unique: true' do
        it 'should find the matching record' do
          expect(call_operation)
            .to have_passing_result
            .with_value(expected)
        end
      end
    end

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

      wrap_context 'when initialized with optional: false' do
        it 'should find the matching records and sort by created_at' do
          expect(call_operation)
            .to have_passing_result
            .with_value(expected)
        end
      end

      wrap_context 'when initialized with unique: true' do
        let(:expected_error) do
          Errors::NotUnique.new(
            attributes:   {},
            record_class: record_class,
            records:      expected
          )
        end

        it 'should return a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        describe 'with where: empty Hash' do
          let(:options) { { where: {} } }

          it 'should return a failing result' do
            expect(call_operation options)
              .to have_failing_result
              .with_error(expected_error)
          end
        end

        describe 'with where: Hash' do
          let(:query)   { { school: Spell::Schools::DIVINATION } }
          let(:options) { { where: query } }
          let(:expected) do
            super().select do |spell|
              spell.school == Spell::Schools::DIVINATION
            end
          end
          let(:expected_error) do
            Errors::NotUnique.new(
              attributes:   query,
              record_class: record_class,
              records:      expected
            )
          end

          it 'should return a failing result' do
            expect(call_operation options)
              .to have_failing_result
              .with_error(expected_error)
          end
        end
      end
    end
  end

  describe '#optional?' do
    include_examples 'should have predicate', :optional?, true

    wrap_context 'when initialized with optional: false' do
      it { expect(operation.optional?).to be false }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  describe '#unique?' do
    include_examples 'should have predicate', :unique?, false

    wrap_context 'when initialized with unique: true' do
      it { expect(operation.unique?).to be true }
    end
  end
end
