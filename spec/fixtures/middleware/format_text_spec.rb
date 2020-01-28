# frozen_string_literal: true

require 'fixtures/middleware/format_text'

RSpec.describe Fixtures::Middleware::FormatText do
  subject(:middleware) { described_class.new(property: property) }

  let(:property) { 'description' }

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:property)
        .and_any_keywords
    end
  end

  describe '#call' do
    let(:next_result)  { Cuprum::Result.new }
    let(:next_command) { instance_double(Cuprum::Command, call: next_result) }
    let(:curried)      { middleware.curry(next_command) }
    let(:data)         { { 'name' => 'Widget' } }
    let(:expected)     { { 'description' => '' }.merge(data) }

    it 'should call the next command' do
      curried.call(data)

      expect(next_command).to have_received(:call).with(expected)
    end

    it 'should return the result of the next command' do
      result = curried.call(data)

      expect(result).to be == next_result
    end

    describe 'with a Hash with property: nil' do
      let(:data)     { super().merge('description' => nil) }
      let(:expected) { data.merge('description' => '') }

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
    end

    describe 'with a Hash with property: empty string' do
      let(:data) { super().merge('description' => '') }

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
    end

    describe 'with a Hash with property: single-line string' do
      let(:description) { 'A simple widget.' }
      let(:data)        { super().merge('description' => description) }

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
    end

    describe 'with a Hash with property: string with trailing newline' do
      let(:description) { "A simple widget.\n" }
      let(:data)        { super().merge('description' => description) }
      let(:expected)    { super().merge('description' => description.strip) }

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
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

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
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

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
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

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
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

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(expected)
      end
    end
  end

  describe '#property' do
    include_examples 'should have reader', :property, -> { property }
  end
end
