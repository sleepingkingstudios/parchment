# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Book, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:book) { described_class.new(attributes) }

  let(:attributes) do
    {
      title:            'Spectres of Flumph Fortress',
      publication_date: Date.new(2013, 8, 15),
      publisher_name:   'Spelljammer Publishing'
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::Records::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '#abbreviation' do
    include_examples 'should have attribute',
      :abbreviation,
      default: '',
      value:   ''

    describe 'when the book is validated' do
      let(:book) { super().tap(&:valid?) }

      it { expect(book.abbreviation).to be == 'sff' }
    end

    describe 'with an abbreviation' do
      let(:attributes) { super().merge(abbreviation: 'flumph') }
      let(:expected)   { attributes[:abbreviation] }

      it { expect(book.abbreviation).to be == expected }

      describe 'when the book is validated' do
        let(:book) { super().tap(&:valid?) }

        it { expect(book.abbreviation).to be == expected }
      end
    end
  end

  describe '#created_at' do
    include_examples 'should have reader', :created_at
  end

  describe '#playtest' do
    include_examples 'should have attribute',
      :playtest,
      default: false,
      value:   false
  end

  describe '#publication_date' do
    include_examples 'should have attribute', :publication_date
  end

  describe '#publisher_name' do
    include_examples 'should have attribute', :publisher_name, default: ''
  end

  describe '#slug' do
    include_examples 'should have attribute',
      :slug,
      default: '',
      value:   ''

    describe 'when the book is validated' do
      let(:book) { super().tap(&:valid?) }

      it { expect(book.slug).to be == 'spectres-flumph-fortress' }
    end

    describe 'with a slug' do
      let(:attributes) { super().merge(slug: 'phantoms-flumph-keep') }
      let(:expected)   { attributes[:slug] }

      it { expect(book.slug).to be == expected }

      describe 'when the book is validated' do
        let(:book) { super().tap(&:valid?) }

        it { expect(book.slug).to be == expected }
      end
    end
  end

  describe '#title' do
    include_examples 'should have attribute', :title, default: ''
  end

  describe '#valid?' do
    it { expect(book).not_to have_errors }

    include_examples 'should validate the uniqueness of',
      :abbreviation,
      attributes: {
        title:            'Spectres Flumph Fortress',
        publication_date: Date.new(2014, 8, 19),
        publisher_name:   'Spelljammer Publishing'
      }

    include_examples 'should validate the presence of', :publication_date

    include_examples 'should validate the presence of',
      :publisher_name,
      type: String

    include_examples 'should validate the uniqueness of',
      :slug,
      attributes: {
        title:            'Spectres Flumph Fortress',
        publication_date: Date.new(2014, 8, 19),
        publisher_name:   'Spelljammer Publishing'
      }

    include_examples 'should validate the presence of', :title, type: String

    include_examples 'should validate the uniqueness of',
      :title,
      attributes: {
        publication_date: Date.new(2014, 8, 19),
        publisher_name:   'Spelljammer Publishing'
      }

    context 'when the title is empty' do
      let(:attributes) { super().merge(title: nil) }

      include_examples 'should validate the presence of',
        :abbreviation,
        type: String

      include_examples 'should validate the presence of', :slug, type: String
    end
  end

  describe '#updated_at' do
    include_examples 'should have reader', :updated_at
  end
end
