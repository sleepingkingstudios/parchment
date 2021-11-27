# frozen_string_literal: true

require 'models/commands/attributes/generate_slug'

RSpec.describe Models::Commands::Attributes::GenerateSlug do
  subject(:command) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(command).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      it 'should return an empty string' do
        expect(command.call nil).to be_a_passing_result.with_value('')
      end
    end

    describe 'with an Object' do
      it 'should return an empty string' do
        expect(command.call Object.new.freeze)
          .to be_a_passing_result
          .with_value('')
      end
    end

    describe 'with an empty symbol' do
      it 'should return an empty string' do
        expect(command.call :'').to be_a_passing_result.with_value('')
      end
    end

    describe 'with a symbol' do
      let(:symbol)   { :Flumph }
      let(:expected) { 'flumph' }

      it 'should format the symbol as a slug' do
        expect(command.call symbol)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with an empty string' do
      it 'should return an empty string' do
        expect(command.call '').to be_a_passing_result.with_value('')
      end
    end

    describe 'with an invalid string' do
      it 'should return an empty string' do
        expect(command.call '!!!').to be_a_passing_result.with_value('')
      end
    end

    describe 'with a one-word string' do
      let(:string)   { 'Flumph' }
      let(:expected) { 'flumph' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a multi-word string' do
      let(:string)   { 'Complete Flumph Manual' }
      let(:expected) { 'complete-flumph-manual' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with leading and trailing whitespace' do
      let(:string)   { "\n\tComplete Flumph Manual \n" }
      let(:expected) { 'complete-flumph-manual' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with interstitial whitespace' do
      let(:string)   { "Complete\tFlumph\tManual" }
      let(:expected) { 'complete-flumph-manual' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with numbers' do
      let(:string)   { 'Complete Flumph Manual 1st Edition' }
      let(:expected) { 'complete-flumph-manual-1st-edition' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with multiple numbers' do
      let(:string)   { 'Complete Flumph Manual 11th Edition' }
      let(:expected) { 'complete-flumph-manual-11th-edition' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with non-letter characters' do
      let(:string)   { "Flumph Master's Guide" }
      let(:expected) { 'flumph-masters-guide' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with ignored articles' do
      let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
      let(:expected) { 'origin-flumphs-revised-edition' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with a kebab-case string' do
      let(:string)   { 'complete-flumph-manual' }
      let(:expected) { 'complete-flumph-manual' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    describe 'with an underscored string' do
      let(:string)   { 'complete_flumph_manual' }
      let(:expected) { 'complete-flumph-manual' }

      it 'should format the string as a slug' do
        expect(command.call string)
          .to be_a_passing_result
          .with_value(expected)
      end
    end
  end
end
