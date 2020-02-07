# frozen_string_literal: true

require 'rails_helper'

require 'errors/not_unique'

RSpec.describe Errors::NotUnique do
  subject(:error) do
    described_class.new(
      attributes:   attributes,
      record_class: record_class,
      records:      records
    )
  end

  let(:attributes)   { { school: Spell::Schools::DIVINATION } }
  let(:record_class) { Spell }
  let(:records)      { Array.new(3) { FactoryBot.create(:spell, attributes) } }

  describe '::TYPE' do
    include_examples 'should define constant', :TYPE, 'not_unique'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:attributes, :record_class, :records)
    end
  end

  describe '#as_json' do
    let(:expected) do
      serialized = records.map { |record| Serializers.serialize(record) }

      {
        'data'    => {
          'attributes'   => attributes.stringify_keys,
          'record_class' => record_class.name,
          'records'      => serialized
        },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#attributes' do
    include_examples 'should have reader', :attributes, -> { attributes }
  end

  describe '#message' do
    context 'when the attributes have one item' do
      let(:attributes) { { school: Spell::Schools::DIVINATION } }
      let(:expected) do
        "#{record_class.name} not unique with attributes school:" \
        " \"divination\" (found #{records.count} results)"
      end

      it { expect(error.message).to be == expected }
    end

    context 'when the attributes have many items' do
      let(:attributes) do
        {
          casting_time: '1 action',
          level:        5,
          school:       Spell::Schools::DIVINATION
        }
      end
      let(:expected) do
        "#{record_class.name} not unique with attributes casting_time:" \
        ' "1 action", level: 5, school: "divination"' \
        " (found #{records.count} results)"
      end

      it { expect(error.message).to be == expected }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  describe '#records' do
    include_examples 'should have reader', :records, -> { records }
  end

  describe '#type' do
    include_examples 'should have reader', :type, 'not_unique'
  end
end
