# frozen_string_literal: true

require 'fixtures/mappings/trim_paragraphs'

RSpec.describe Fixtures::Mappings::TrimParagraphs do
  subject(:mapping) { described_class.new(property: property) }

  let(:property) { 'description' }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:property)
    end
  end

  describe '#call' do
    it { expect(mapping).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      it 'should raise an error' do
        expect { mapping.call nil }
          .to raise_error ArgumentError, 'data must be a Hash'
      end
    end

    describe 'with an object' do
      it 'should raise an error' do
        expect { mapping.call Object.new }
          .to raise_error ArgumentError, 'data must be a Hash'
      end
    end

    describe 'with an empty Hash' do
      it { expect(mapping.call({})).to be == {} }
    end

    describe 'with a Hash without the property' do
      let(:data) { { 'name' => 'Widget' } }

      it { expect(mapping.call(data)).to be == data }
    end

    describe 'with a Hash with property: nil' do
      let(:data)     { { 'name' => 'Widget', 'description' => nil } }
      let(:expected) { data.merge('description' => '') }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: empty string' do
      let(:data)     { { 'name' => 'Widget', 'description' => '' } }
      let(:expected) { data }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: single-line string' do
      let(:description) { 'A simple widget.' }
      let(:data) do
        {
          'name'        => 'Widget',
          'description' => description
        }
      end
      let(:expected) { data }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: multi-line string' do
      let(:description) do
        "A simple widget.\nReally, really simple.\nReally."
      end
      let(:data) do
        {
          'name'        => 'Widget',
          'description' => description
        }
      end
      let(:trimmed)  { description.tr("\n", ' ') }
      let(:expected) { data.merge('description' => trimmed) }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: multiple paragraphs' do
      let(:description) do
        <<~STRING.strip
          A simple widget.
          Really, really simple.
          Really.

          Like, really simple.
          I mean, this widget is not that complicated.

          Naturally it comes with a 1,000 page manual.
          Although most of the manual is blank.
          Feel free to doodle in it.
        STRING
      end
      let(:data) do
        {
          'name'        => 'Widget',
          'description' => description
        }
      end
      let(:trimmed) do
        <<~STRING.strip
          A simple widget. Really, really simple. Really.

          Like, really simple. I mean, this widget is not that complicated.

          Naturally it comes with a 1,000 page manual. Although most of the manual is blank. Feel free to doodle in it.
        STRING
      end
      let(:expected) { data.merge('description' => trimmed) }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: unordered list' do
      let(:description) do
        <<~STRING.strip
          - Only one button.
          - Shiny chrome exterior.
          - Even makes Julienne fries.
        STRING
      end
      let(:data) do
        {
          'name'        => 'Widget',
          'description' => description
        }
      end

      it { expect(mapping.call(data)).to be == data }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end

    describe 'with a Hash with property: mixed paragraphs and lists' do
      let(:description) do
        <<~STRING.strip
          A simple widget.
          Really, really simple.
          Really.

          Like, really simple.
          I mean, this widget is not that complicated.

          - Only one button.
          - Shiny chrome exterior.
          - Even makes Julienne fries.

          Naturally it comes with a 1,000 page manual.
          Although most of the manual is blank.
          Feel free to doodle in it.
        STRING
      end
      let(:data) do
        {
          'name'        => 'Widget',
          'description' => description
        }
      end
      let(:trimmed) do
        <<~STRING.strip
          A simple widget. Really, really simple. Really.

          Like, really simple. I mean, this widget is not that complicated.

          - Only one button.
          - Shiny chrome exterior.
          - Even makes Julienne fries.

          Naturally it comes with a 1,000 page manual. Although most of the manual is blank. Feel free to doodle in it.
        STRING
      end
      let(:expected) { data.merge('description' => trimmed) }

      it { expect(mapping.call(data)).to be == expected }

      it { expect { mapping.call(data) }.not_to change(data, :dup) }
    end
  end

  describe '#property' do
    include_examples 'should have reader', :property, -> { property }
  end
end
