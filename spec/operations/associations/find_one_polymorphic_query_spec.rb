# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/find_one_polymorphic_query'

RSpec.describe Operations::Associations::FindOnePolymorphicQuery do
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
    let(:spell) { FactoryBot.build(:spell) }

    context 'when the resource does not have an association' do
      it 'should return a passing result' do
        expect(operation.call spell)
          .to be_a_passing_result.with_value({})
      end

      describe 'with as: value' do
        it 'should return a passing result' do
          expect(operation.call spell, as: :source)
            .to be_a_passing_result.with_value({})
        end
      end
    end

    context 'when the association does not exist' do
      let(:publication_id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { id: publication_id },
          record_class: Publication
        )
      end

      before(:example) do
        spell.source_id   = publication_id
        spell.source_type = 'Publication'
      end

      it 'should return a failing result' do
        expect(operation.call spell)
          .to be_a_failing_result.with_error(expected_error)
      end
    end

    context 'when the association exists' do
      let(:publication) { FactoryBot.create(:publication) }
      let(:expected)    { { 'publication' => publication } }

      before(:example) { spell.source = publication }

      it 'should return a passing result' do
        expect(operation.call spell)
          .to be_a_passing_result.with_value(expected)
      end

      describe 'with as: value' do
        let(:expected) { { 'source' => publication } }

        it 'should return a passing result' do
          expect(operation.call spell, as: :source)
            .to be_a_passing_result.with_value(expected)
        end
      end
    end
  end

  describe '#resource_class' do
    include_examples 'should define reader', :resource_class

    it { expect(operation.resource_class).to be Spell }
  end
end
