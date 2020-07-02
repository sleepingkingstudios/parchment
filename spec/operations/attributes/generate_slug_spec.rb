# frozen_string_literal: true

require 'operations/attributes/generate_slug'

RSpec.describe Operations::Attributes::GenerateSlug do
  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:expected_error) do
        Cuprum::Error.new(message: "Value can't be blank")
      end

      it 'should return a failing result' do
        expect(operation.call nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      let(:expected_error) do
        Cuprum::Error.new(message: 'Value must be a String')
      end

      it 'should return a failing result' do
        expect(operation.call Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a symbol' do
      let(:expected_error) do
        Cuprum::Error.new(message: 'Value must be a String')
      end

      it 'should return a failing result' do
        expect(operation.call :symbol)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty string' do
      let(:expected_error) do
        Cuprum::Error.new(message: "Value can't be blank")
      end

      it 'should return a failing result' do
        expect(operation.call '')
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a one-word string' do
      let(:string)   { 'Flumph' }
      let(:expected) { 'flumph' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a multi-word string' do
      let(:string)   { 'Complete Flumph Manual' }
      let(:expected) { 'complete-flumph-manual' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with leading and trailing whitespace' do
      let(:string)   { "\n\tComplete Flumph Manual \n" }
      let(:expected) { 'complete-flumph-manual' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with interstitial whitespace' do
      let(:string)   { "Complete\tFlumph\tManual" }
      let(:expected) { 'complete-flumph-manual' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with numbers' do
      let(:string)   { 'Complete Flumph Manual 1st Edition' }
      let(:expected) { 'complete-flumph-manual-1st-edition' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with multiple numbers' do
      let(:string)   { 'Complete Flumph Manual 11th Edition' }
      let(:expected) { 'complete-flumph-manual-11th-edition' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with non-letter characters' do
      let(:string)   { "Flumph Master's Guide" }
      let(:expected) { 'flumph-masters-guide' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end

    describe 'with a string with ignored articles' do
      let(:string)   { 'On The Origin of Flumphs, Revised Edition' }
      let(:expected) { 'origin-flumphs-revised-edition' }

      it 'should return a passing result' do
        expect(operation.call string)
          .to have_passing_result
          .with_value(expected)
      end
    end
  end
end
