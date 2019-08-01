# frozen_string_literal: true

require 'rails_helper'

require 'operations/spells/find_matching_operation'

RSpec.describe Operations::Spells::FindMatchingOperation do
  subject(:operation) { described_class.new }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    def call_operation
      operation.call
    end

    it { expect(operation).to respond_to(:call).with(0).arguments }

    it { expect(call_operation).to have_passing_result.with_value([]) }

    context 'when there are many records' do
      let(:record_attributes) do
        [
          { name: 'Magic Missile' },
          { name: 'Fireball' },
          { name: 'Lightning Bolt' }
        ]
      end
      let!(:records) do
        record_attributes.map { |hsh| FactoryBot.create(:spell, hsh) }
      end
      let(:expected) do
        records.sort_by(&:name)
      end

      it 'should find the matching records' do
        expect(call_operation)
          .to have_passing_result
          .with_value(expected)
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
