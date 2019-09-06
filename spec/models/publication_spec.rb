# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Publication, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:publication) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:             "Flumph Fancier's Handbook",
      playtest:         false,
      publication_date: Date.new(1982, 7, 9),
      publisher_name:   'Wizards of the Coast'
    }
  end

  describe '#abbreviation' do
    include_examples 'should have attribute',
      :abbreviation,
      default: '',
      value:   'ff'

    describe 'when the publication is validated' do
      let(:publication) { super().tap(&:valid?) }

      it { expect(publication.abbreviation).to be == 'ffh' }
    end

    describe 'with an abbreviation' do
      let(:attributes) { super().merge(abbreviation: 'flumph') }
      let(:expected)   { attributes[:abbreviation] }

      it { expect(publication.abbreviation).to be == expected }

      describe 'when the publication is validated' do
        let(:publication) { super().tap(&:valid?) }

        it { expect(publication.abbreviation).to be == expected }
      end
    end
  end

  describe '#created_at' do
    include_examples 'should have reader', :created_at
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the publication is persisted' do
      before(:example) { publication.save! }

      it { expect(publication.id).to be_a_uuid }
    end
  end

  describe '#official?' do
    include_examples 'should have predicate', :official?, true

    context 'with playtest: true' do
      let(:attributes) { super().merge(playtest: true) }

      it { expect(publication.official?).to be false }
    end

    context 'with publisher_name: other' do
      let(:attributes) { super().merge(publisher_name: 'Paizo') }

      it { expect(publication.official?).to be false }
    end
  end

  describe '#name' do
    include_examples 'should have attribute',
      :name,
      default: ''
  end

  describe '#playtest' do
    include_examples 'should have attribute',
      :playtest,
      default: false,
      value:   true
  end

  describe '#playtest?' do
    include_examples 'should have predicate', :playtest?, false

    context 'with playtest: true' do
      let(:attributes) { super().merge(playtest: true) }

      it { expect(publication.playtest?).to be true }
    end
  end

  describe '#publication_date' do
    include_examples 'should have attribute', :publication_date
  end

  describe '#publisher_name' do
    include_examples 'should have attribute',
      :publisher_name,
      default: ''
  end

  describe '#slug' do
    include_examples 'should have attribute',
      :slug,
      default: '',
      value:   'flumph-fanciers-handbook'

    describe 'when the publication is validated' do
      let(:publication) { super().tap(&:valid?) }

      it { expect(publication.slug).to be == 'flumph-fanciers-handbook' }
    end

    describe 'with a slug' do
      let(:attributes) { super().merge(slug: 'flumph-fanciers-guide') }
      let(:expected)   { attributes[:slug] }

      it { expect(publication.slug).to be == expected }

      describe 'when the publication is validated' do
        let(:publication) { super().tap(&:valid?) }

        it { expect(publication.slug).to be == expected }
      end
    end
  end

  describe '#spells' do
    include_examples 'should have reader', :spells, []

    context 'when the publication has many spells' do
      let(:spells) do
        Array.new(3) { FactoryBot.build(:spell, source: publication) }
      end

      before(:example) do
        publication.save!

        spells.each(&:save!)
      end

      it { expect(publication.spells).to contain_exactly(*spells) }
    end
  end

  describe '#updated_at' do
    include_examples 'should have reader', :updated_at
  end

  describe '#valid?' do
    it { expect(publication).not_to have_errors }

    include_examples 'should validate the scoped uniqueness of',
      :abbreviation,
      attributes: {
        name:             "The Flumph Fancier's Handbook",
        playtest:         true,
        publication_date: Date.new(2010, 12, 17)
      },
      scope:      { publisher_name: ['Wizards of the Coast', 'Paizo'] }

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the scoped uniqueness of',
      :name,
      attributes: {
        playtest:         true,
        publication_date: Date.new(2010, 12, 17)
      },
      scope:      { publisher_name: ['Wizards of the Coast', 'Paizo'] }

    include_examples 'should validate the presence of', :publication_date

    include_examples 'should validate the presence of',
      :publisher_name,
      type: String

    include_examples 'should validate the scoped uniqueness of',
      :slug,
      attributes: {
        name:             "The Flumph Fancier's Handbook",
        playtest:         true,
        publication_date: Date.new(2010, 12, 17)
      },
      scope:      { publisher_name: ['Wizards of the Coast', 'Paizo'] }
  end
end
