# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/source_examples'

RSpec.describe References::Items::MagicItem do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::SourceExamples

  subject(:magic_item) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:              'Philter of Filtering',
      category:          described_class::Categories::WONDROUS_ITEM,
      description:       'An enchanted flask that purifies its contents.',
      rarity:            described_class::Rarities::RARE,
      slug:              'philter-filtering',
      short_description: 'Purifies its contents.'
    }
  end

  describe '::Categories' do
    let(:expected_categories) do
      {
        ARMOR:         'armor',
        POTION:        'potion',
        RING:          'ring',
        ROD:           'rod',
        SCROLL:        'scroll',
        STAFF:         'staff',
        WAND:          'wand',
        WEAPON:        'weapon',
        WONDROUS_ITEM: 'wondrous item'
      }
    end

    include_examples 'should define immutable constant', :Categories

    it 'should enumerate the categories' do
      expect(described_class::Categories.all).to be == expected_categories
    end

    describe '::ARMOR' do
      it 'should store the value' do
        expect(described_class::Categories::ARMOR).to be == 'armor'
      end
    end

    describe '::POTION' do
      it 'should store the value' do
        expect(described_class::Categories::POTION).to be == 'potion'
      end
    end

    describe '::RING' do
      it 'should store the value' do
        expect(described_class::Categories::RING).to be == 'ring'
      end
    end

    describe '::ROD' do
      it 'should store the value' do
        expect(described_class::Categories::ROD).to be == 'rod'
      end
    end

    describe '::SCROLL' do
      it 'should store the value' do
        expect(described_class::Categories::SCROLL).to be == 'scroll'
      end
    end

    describe '::STAFF' do
      it 'should store the value' do
        expect(described_class::Categories::STAFF).to be == 'staff'
      end
    end

    describe '::WAND' do
      it 'should store the value' do
        expect(described_class::Categories::WAND).to be == 'wand'
      end
    end

    describe '::WEAPON' do
      it 'should store the value' do
        expect(described_class::Categories::WEAPON).to be == 'weapon'
      end
    end

    describe '::WONDROUS_ITEM' do
      it 'should store the value' do
        expect(described_class::Categories::WONDROUS_ITEM)
          .to be == 'wondrous item'
      end
    end
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::References::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '::Rarities' do
    let(:expected_rarities) do
      {
        COMMON:    'common',
        UNCOMMON:  'uncommon',
        RARE:      'rare',
        VERY_RARE: 'very rare',
        LEGENDARY: 'legendary',
        ARTIFACT:  'artifact'
      }
    end

    include_examples 'should define immutable constant', :Rarities

    it 'should enumerate the rarities' do
      expect(described_class::Rarities.all).to be == expected_rarities
    end

    describe '::COMMON' do
      it 'should store the value' do
        expect(described_class::Rarities::COMMON).to be == 'common'
      end
    end

    describe '::UNCOMMON' do
      it 'should store the value' do
        expect(described_class::Rarities::UNCOMMON).to be == 'uncommon'
      end
    end

    describe '::RARE' do
      it 'should store the value' do
        expect(described_class::Rarities::RARE).to be == 'rare'
      end
    end

    describe '::VERY_RARE' do
      it 'should store the value' do
        expect(described_class::Rarities::VERY_RARE).to be == 'very rare'
      end
    end

    describe '::LEGENDARY' do
      it 'should store the value' do
        expect(described_class::Rarities::LEGENDARY).to be == 'legendary'
      end
    end

    describe '::ARTIFACT' do
      it 'should store the value' do
        expect(described_class::Rarities::ARTIFACT).to be == 'artifact'
      end
    end
  end

  describe '.slug_attribute' do
    include_examples 'should define class reader', :slug_attribute, 'name'
  end

  include_examples 'should define a has_one :source association'

  include_examples 'should define primary key'

  include_examples 'should define slug'

  include_examples 'should define timestamps'

  describe '#category' do
    include_examples 'should define attribute option', :data, :category
  end

  describe '#cost' do
    before(:example) { magic_item.valid? }

    context 'when the rarity is "common"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::COMMON)
      end

      include_examples 'should have attribute',
        :cost,
        default: '50-100 gp',
        value:   '100,000 gp'
    end

    context 'when the rarity is "uncommon"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::UNCOMMON)
      end

      include_examples 'should have attribute',
        :cost,
        default: '101-500 gp',
        value:   '100,000 gp'
    end

    context 'when the rarity is "rare"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::RARE)
      end

      include_examples 'should have attribute',
        :cost,
        default: '501-5,000 gp',
        value:   '100,000 gp'
    end

    context 'when the rarity is "very rare"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::VERY_RARE)
      end

      include_examples 'should have attribute',
        :cost,
        default: '5,001-50,000 gp',
        value:   '100,000 gp'
    end

    context 'when the rarity is "legendary"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::LEGENDARY)
      end

      include_examples 'should have attribute',
        :cost,
        default: '50,001+ gp',
        value:   '100,000 gp'
    end

    context 'when the rarity is "Artifact"' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarities::ARTIFACT)
      end

      include_examples 'should have attribute',
        :cost,
        default: 'Priceless',
        value:   '100,000 gp'
    end

    context 'when the rarity is an invalid value' do
      let(:attributes) { super().merge(rarity: 'Lost') }

      include_examples 'should have attribute',
        :cost,
        default: '',
        value:   '100,000 gp'
    end
  end

  describe '#data' do
    include_examples 'should define attribute',
      :data,
      default: lambda {
        {
          'category' => attributes[:category],
          'rarity'   => attributes[:rarity]
        }
      },
      value:   {}
  end

  describe '#description' do
    include_examples 'should define attribute', :description, default: ''
  end

  describe '#name' do
    include_examples 'should define attribute', :name, default: ''
  end

  describe '#rarity' do
    include_examples 'should define attribute option', :data, :rarity
  end

  describe '#short_description' do
    include_examples 'should define attribute', :short_description, default: ''
  end

  describe '#valid?' do
    it { expect(magic_item).not_to have_errors }

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of', :category, type: String

    include_examples 'should validate the inclusion of',
      :category,
      in:      described_class::Categories.values,
      message: 'must be Armor, Potion, Ring, Rod, Scroll, Staff, Wand,' \
               ' Weapon, or Wondrous Item'

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the uniqueness of', :name

    include_examples 'should validate the presence of', :rarity, type: String

    include_examples 'should validate the inclusion of',
      :rarity,
      in:      described_class::Rarities.values,
      message: 'must be Common, Uncommon, Rare, Very Rare, Legendary, or' \
               ' Artifact'

    context 'when the rarity is an invalid value' do
      let(:attributes) { super().merge(rarity: 'Lost') }

      include_examples 'should validate the presence of', :cost, type: String
    end
  end
end
