# frozen_string_literal: true

require 'rails_helper'

require 'models/naming'

RSpec.describe Models::Naming do
  shared_context 'when initialized with custom articles' do
    let(:articles) { [] }
    let(:keywords) { { articles: articles } }
  end

  subject(:naming) { described_class.new(keywords) }

  let(:keywords) { {} }

  describe '::ARTICLES' do
    include_examples 'should define immutable constant',
      :ARTICLES,
      %w[of on the]
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:articles)
    end
  end

  describe '::generate_abbreviation' do
    let(:instance) { described_class.instance }
    let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
    let(:expected) { 'ofre' }

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:generate_abbreviation)
        .with(1).argument
    end

    it 'should delegate to the instance' do
      allow(instance).to receive(:generate_abbreviation)

      described_class.generate_abbreviation(string)

      expect(instance).to have_received(:generate_abbreviation).with(string)
    end

    it 'should generate the abbreviation' do
      expect(described_class.generate_abbreviation string).to be == expected
    end
  end

  describe '::generate_slug' do
    let(:instance) { described_class.instance }
    let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
    let(:expected) { 'origin-flumphs-revised-edition' }

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:generate_slug)
        .with(1).argument
    end

    it 'should delegate to the instance' do
      allow(instance).to receive(:generate_slug)

      described_class.generate_slug(string)

      expect(instance).to have_received(:generate_slug).with(string)
    end

    it 'should generate the slug' do
      expect(described_class.generate_slug string).to be == expected
    end
  end

  describe '::instance' do
    let(:instance) { described_class.instance }

    it { expect(described_class).to respond_to(:instance).with(0).arguments }

    it { expect(described_class.instance).to be_a described_class }

    it 'should set the default articles' do
      expect(instance.articles).to be == described_class::ARTICLES
    end

    it 'should return the same object' do
      expect(described_class.instance).to be instance
    end
  end

  describe '#articles' do
    include_examples 'should have reader', :articles, %w[of on the]

    wrap_context 'when initialized with custom articles' do
      it { expect(naming.articles).to be articles }
    end
  end

  describe '#generate_abbreviation' do
    it { expect(naming).to respond_to(:generate_abbreviation).with(1).argument }

    describe 'with nil' do
      it { expect(naming.generate_abbreviation nil).to be == '' }
    end

    describe 'with an empty string' do
      it { expect(naming.generate_abbreviation '').to be == '' }
    end

    describe 'with a single word' do
      let(:string) { 'Flumph' }

      it { expect(naming.generate_abbreviation string).to be == 'f' }
    end

    describe 'with a multi-word string' do
      let(:string) { 'Complete Flumph Manual' }

      it { expect(naming.generate_abbreviation string).to be == 'cfm' }
    end

    describe 'with a string with leading and trailing whitespace' do
      let(:string) { "\n\tComplete Flumph Manual \n" }

      it { expect(naming.generate_abbreviation string).to be == 'cfm' }
    end

    describe 'with a string with interstitial whitespace' do
      let(:string) { "Complete\tFlumph\tManual" }

      it { expect(naming.generate_abbreviation string).to be == 'cfm' }
    end

    describe 'with a string with numbers' do
      let(:string) { 'Complete Flumph Manual 1st Edition' }

      it { expect(naming.generate_abbreviation string).to be == 'cfm1e' }
    end

    describe 'with a string with multiple numbers' do
      let(:string) { 'Complete Flumph Manual 11th Edition' }

      it { expect(naming.generate_abbreviation string).to be == 'cfm11e' }
    end

    describe 'with a string with non-letter characters' do
      let(:string) { "Flumph Master's Guide" }

      it { expect(naming.generate_abbreviation string).to be == 'fmg' }
    end

    describe 'with a string with ignored articles' do
      let(:string) { 'On The Origin of Flumphs, Revised Edition' }

      it { expect(naming.generate_abbreviation string).to be == 'ofre' }
    end

    wrap_context 'when initialized with custom articles' do
      describe 'with a string with ignored articles' do
        let(:string) { 'On The Origin of Flumphs, Revised Edition' }

        it { expect(naming.generate_abbreviation string).to be == 'otoofre' }
      end
    end
  end

  describe '#generate_slug' do
    it { expect(naming).to respond_to(:generate_slug).with(1).argument }

    describe 'with nil' do
      it { expect(naming.generate_slug nil).to be == '' }
    end

    describe 'with an empty string' do
      it { expect(naming.generate_slug '').to be == '' }
    end

    describe 'with a single word' do
      let(:string) { 'Flumph' }

      it { expect(naming.generate_slug string).to be == 'flumph' }
    end

    describe 'with a multi-word string' do
      let(:string)   { 'Complete Flumph Manual' }
      let(:expected) { 'complete-flumph-manual' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with leading and trailing whitespace' do
      let(:string)   { "\n\tComplete Flumph Manual \n" }
      let(:expected) { 'complete-flumph-manual' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with interstitial whitespace' do
      let(:string)   { "Complete\tFlumph\tManual" }
      let(:expected) { 'complete-flumph-manual' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with numbers' do
      let(:string)   { 'Complete Flumph Manual 1st Edition' }
      let(:expected) { 'complete-flumph-manual-1st-edition' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with multiple numbers' do
      let(:string)   { 'Complete Flumph Manual 11th Edition' }
      let(:expected) { 'complete-flumph-manual-11th-edition' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with non-letter characters' do
      let(:string)   { "Flumph Master's Guide" }
      let(:expected) { 'flumph-masters-guide' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    describe 'with a string with ignored articles' do
      let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
      let(:expected) { 'origin-flumphs-revised-edition' }

      it { expect(naming.generate_slug string).to be == expected }
    end

    wrap_context 'when initialized with custom articles' do
      describe 'with a string with ignored articles' do
        let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
        let(:expected) { 'on-the-origin-of-flumphs-revised-edition' }

        it { expect(naming.generate_slug string).to be == expected }
      end
    end
  end
end
