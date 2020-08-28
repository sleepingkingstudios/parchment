# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/source_examples'

RSpec.describe References::Language, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::SourceExamples

  shared_context 'when the language has a parent language' do
    let(:parent_language) do
      FactoryBot.build(
        :language,
        name:     'Body Language',
        rarity:   described_class::Rarity::STANDARD,
        script:   'None',
        slug:     'body-language',
        speakers: 'Mimes'
      )
    end
    let(:attributes) { super().merge(parent_language: parent_language) }

    before(:example) do
      parent_language.save!
    end
  end

  shared_context 'when the language has many dialects' do
    let(:dialects) do
      ['Interpretive Bus Stop', 'Interpretive Disco', 'Interpretive Lindy Hop']
        .map do |name|
          FactoryBot.build(:language, parent_language: language, name: name)
        end
    end

    before(:example) do
      language.save!

      dialects.each(&:save!)
    end
  end

  subject(:language) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:     'Interpretive Dance',
      rarity:   described_class::Rarity::STANDARD,
      script:   'None',
      slug:     'interpretive-dance',
      speakers: 'Mimes'
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::References::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '::Rarity' do
    let(:expected_rarities) do
      {
        EXOTIC:   'exotic',
        STANDARD: 'standard'
      }
    end

    include_examples 'should define immutable constant', :Rarity

    it 'should enumerate the rarities' do
      expect(described_class::Rarity.all).to be == expected_rarities
    end

    describe '::EXOTIC' do
      it 'should store the value' do
        expect(described_class::Rarity::EXOTIC).to be == 'exotic'
      end
    end

    describe '::STANDARD' do
      it 'should store the value' do
        expect(described_class::Rarity::STANDARD).to be == 'standard'
      end
    end
  end

  include_examples 'should define a has_one :source association'

  include_examples 'should have primary key'

  include_examples 'should have slug'

  include_examples 'should have timestamps'

  describe '#dialects' do
    include_examples 'should have reader', :dialects, []

    wrap_context 'when the language has many dialects' do
      it { expect(language.dialects).to contain_exactly(*dialects) }
    end
  end

  describe '#exotic?' do
    include_examples 'should have predicate', :exotic?, false

    context 'when the language is exotic' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarity::EXOTIC)
      end

      it { expect(language.exotic?).to be true }
    end
  end

  describe '#name' do
    include_examples 'should have attribute', :name, default: ''
  end

  describe '#parent_language' do
    include_examples 'should have reader', :parent_language, nil

    wrap_context 'when the language has a parent language' do
      it { expect(language.parent_language).to be == parent_language }
    end
  end

  describe '#parent_language_id' do
    include_examples 'should have reader', :parent_language_id, nil

    wrap_context 'when the language has a parent language' do
      it { expect(language.parent_language_id).to be == parent_language.id }
    end
  end

  describe '#rarity' do
    include_examples 'should have attribute', :rarity, default: ''
  end

  describe '#script' do
    include_examples 'should have attribute', :script, default: ''
  end

  describe '#speakers' do
    include_examples 'should have attribute', :speakers, default: ''
  end

  describe '#standard?' do
    include_examples 'should have predicate', :standard?, true

    context 'when the language is exotic' do
      let(:attributes) do
        super().merge(rarity: described_class::Rarity::EXOTIC)
      end

      it { expect(language.standard?).to be false }
    end
  end

  describe '#valid?' do
    it { expect(language).not_to have_errors }

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the uniqueness of', :name

    include_examples 'should validate the presence of',
      :rarity,
      type: String

    include_examples 'should validate the inclusion of',
      :rarity,
      in:      described_class::Rarity.all.values,
      message: 'must be standard or exotic'
  end
end
