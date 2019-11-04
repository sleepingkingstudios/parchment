# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Source, type: :model do
  include Spec::Support::Examples::ModelExamples

  shared_context 'when the origin is a book' do
    let(:book)   { FactoryBot.build(:book) }
    let(:origin) { book }

    before(:example) do
      book.save!

      source.origin = book
    end
  end

  shared_context 'when the origin is set' do
    include_context 'when the origin is a book'
  end

  shared_context 'when the reference is a spell' do
    let(:spell)     { FactoryBot.build(:spell) }
    let(:reference) { spell }

    before(:example) do
      spell.save!

      source.reference = spell
    end
  end

  shared_context 'when the reference is set' do
    include_context 'when the reference is a spell'
  end

  shared_examples 'should delegate to the metadata' \
  do |prop_name, old_value:, new_value:|
    reader_name = prop_name.to_s
    writer_name = "#{prop_name}="

    include_examples 'should have attribute', prop_name, value: nil

    it 'should update the metadata' do
      expect { subject.send(writer_name, new_value) }
        .to change(subject, :metadata)
        .to be >= { reader_name => new_value }
    end

    context "when the #{prop_name} property is set" do
      let(:attributes) { super().merge(prop_name => old_value) }

      it { expect(subject.send(reader_name)).to be == attributes[prop_name] }

      it 'should update the metadata' do
        expect { subject.send(writer_name, new_value) }
          .to change(subject, :metadata)
          .to be >= { reader_name => new_value }
      end
    end
  end

  subject(:source) { described_class.new(attributes) }

  let(:attributes) do
    {
      metadata: {
        'name'     => 'Spectres of Flumph Fortress',
        'playtest' => true
      }
    }
  end

  describe '::ORIGIN_TYPES' do
    include_examples 'should define immutable constant',
      :ORIGIN_TYPES,
      -> { contain_exactly('Book') }
  end

  describe '::REFERENCE_TYPES' do
    include_examples 'should define immutable constant',
      :REFERENCE_TYPES,
      -> { contain_exactly('Spell') }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::Records::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '#created_at' do
    include_examples 'should have reader', :created_at
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the source is persisted' do
      include_context 'when the origin is set'
      include_context 'when the reference is set'

      before(:example) { source.save! }

      it { expect(source.id).to be_a_uuid }
    end
  end

  describe '#metadata' do
    include_examples 'should have attribute', :metadata, default: {}
  end

  describe '#name' do
    let(:attributes) { super().tap { |hsh| hsh.delete(:metadata) } }

    include_examples 'should delegate to the metadata',
      :name,
      old_value: 'Spectres of Flumph Fortress',
      new_value: 'Crime in Flumphtownville'
  end

  describe '#origin' do
    include_examples 'should have property', :origin, nil

    wrap_context 'when the origin is a book' do
      it { expect(source.origin).to be == book }
    end
  end

  describe '#origin_id' do
    include_examples 'should have property', :origin_id, nil

    wrap_context 'when the origin is a book' do
      it { expect(source.origin_id).to be == book.id }
    end
  end

  describe '#origin_type' do
    include_examples 'should have property', :origin_type, nil

    wrap_context 'when the origin is a book' do
      it { expect(source.origin_type).to be == 'Book' }
    end
  end

  describe '#playtest' do
    let(:attributes) { super().tap { |hsh| hsh.delete(:metadata) } }

    include_examples 'should delegate to the metadata',
      :playtest,
      old_value: true,
      new_value: false
  end

  describe '#playtest?' do
    include_examples 'should have predicate', :playtest?, true

    context 'when the playtest property is set' do
      let(:attributes) do
        super().tap { |hsh| hsh.delete(:metadata) }.merge(playtest: false)
      end

      it { expect(source.playtest?).to be false }
    end
  end

  describe '#reference' do
    include_examples 'should have property', :reference, nil

    wrap_context 'when the reference is a spell' do
      it { expect(source.reference).to be == spell }
    end
  end

  describe '#reference_id' do
    include_examples 'should have property', :reference_id, nil

    wrap_context 'when the reference is a spell' do
      it { expect(source.reference_id).to be == spell.id }
    end
  end

  describe '#reference_type' do
    include_examples 'should have property', :reference_type, nil

    wrap_context 'when the reference is a spell' do
      it { expect(source.reference_type).to be == 'Spell' }
    end
  end

  describe '#updated_at' do
    include_examples 'should have reader', :updated_at
  end

  describe '#valid?' do
    context 'when the metadata is empty' do
      let(:attributes) { super().merge(metadata: {}) }

      include_examples 'should validate the presence of', :name, type: String
    end

    context 'when the origin is empty' do
      it { expect(source).not_to be_valid }

      it 'should have an error' do
        expect(source).to have_errors.on(:origin).with_message('must exist')
      end
    end

    wrap_context 'when the origin is a book' do
      include_context 'when the reference is set'

      it { expect(source).to be_valid }
    end

    context 'when the reference is empty' do
      it { expect(source).not_to be_valid }

      it 'should have an error' do
        expect(source).to have_errors.on(:reference).with_message('must exist')
      end
    end

    context 'when the reference already has a source' do
      include_context 'when the origin is set'

      let(:spell)     { FactoryBot.build(:spell) }
      let(:reference) { spell }
      let(:other_source) do
        FactoryBot.build(:source, :with_book, reference: spell)
      end

      before(:example) do
        spell.save!
        other_source.save!

        source.reference = reference
      end

      it { expect(source).not_to be_valid }

      it 'should have an error' do
        expect(source)
          .to have_errors
          .on(:reference)
          .with_message('already has a source')
      end
    end

    wrap_context 'when the reference is a spell' do
      include_context 'when the origin is set'

      it { expect(source).to be_valid }
    end
  end
end
