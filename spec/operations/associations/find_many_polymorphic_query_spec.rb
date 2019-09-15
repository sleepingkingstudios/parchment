# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/find_many_polymorphic_query'

RSpec.describe Operations::Associations::FindManyPolymorphicQuery do
  subject(:operation) do
    described_class.new(
      association_name: association_name,
      resource_class:   resource_class
    )
  end

  let(:association_name) { 'source' }
  let(:resource_class)   { Spell }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:association_name, :resource_class)
    end
  end

  describe '#association_name' do
    include_examples 'should define reader',
      :association_name,
      -> { association_name }
  end

  describe '#call' do
    describe 'with an empty array' do
      it 'should return a passing result' do
        expect(operation.call [])
          .to be_a_passing_result.with_value({})
      end

      describe 'with as: value' do
        it 'should return a passing result' do
          expect(operation.call [], as: :source)
            .to be_a_passing_result.with_value({})
        end
      end
    end

    describe 'with an array with many resources' do
      let(:spells) { Array.new(3) { FactoryBot.build(:spell) } }

      context 'when the associations do not exist' do
        let(:publication_ids) do
          [
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000001'
          ]
        end
        let(:expected_error) do
          Errors::NotFound.new(
            attributes:   { ids: publication_ids },
            record_class: Publication
          )
        end

        before(:example) do
          spells[0].source_id   = publication_ids[0]
          spells[0].source_type = 'Publication'
          spells[1].source_id   = publication_ids[1]
          spells[1].source_type = 'Publication'
        end

        it 'should return a failing result' do
          expect(operation.call spells)
            .to be_a_failing_result.with_error(expected_error)
        end
      end

      context 'when none of the resources have an association' do
        it 'should return a passing result' do
          expect(operation.call spells)
            .to be_a_passing_result.with_value({})
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with as: value' do
          it 'should return a passing result' do
            expect(operation.call spells, as: :source)
              .to be_a_passing_result.with_value({})
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      context 'when some of the resources have an association' do
        let(:publications) { Array.new(2) { FactoryBot.create(:publication) } }
        let(:expected)     { { 'publications' => publications } }

        before(:example) do
          spells[0].source = publications[0]
          spells[1].source = publications[1]
        end

        it 'should return a passing result' do
          expect(operation.call spells)
            .to be_a_passing_result.with_value(expected)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with as: value' do
          let(:expected) { { 'sources' => publications } }

          it 'should return a passing result' do
            expect(operation.call spells, as: :sources)
              .to be_a_passing_result.with_value(expected)
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      context 'when all of the resources have an association' do
        let(:publications) { Array.new(3) { FactoryBot.create(:publication) } }
        let(:expected)     { { 'publications' => publications } }

        before(:example) do
          spells[0].source = publications[0]
          spells[1].source = publications[1]
          spells[2].source = publications[2]
        end

        it 'should return a passing result' do
          expect(operation.call spells)
            .to be_a_passing_result.with_value(expected)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with as: value' do
          let(:expected) { { 'sources' => publications } }

          it 'should return a passing result' do
            expect(operation.call spells, as: :sources)
              .to be_a_passing_result.with_value(expected)
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end

      context 'when the resources share an association' do
        let(:publication) { FactoryBot.create(:publication) }
        let(:expected)    { { 'publications' => [publication] } }

        before(:example) do
          spells[0].source = publication
          spells[1].source = publication
        end

        it 'should return a passing result' do
          expect(operation.call spells)
            .to be_a_passing_result.with_value(expected)
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with as: value' do
          let(:expected) { { 'sources' => [publication] } }

          it 'should return a passing result' do
            expect(operation.call spells, as: :sources)
              .to be_a_passing_result.with_value(expected)
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end

  describe '#resource_class' do
    include_examples 'should define reader', :resource_class

    it { expect(operation.resource_class).to be Spell }
  end
end
