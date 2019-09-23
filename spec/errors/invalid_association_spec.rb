# frozen_string_literal: true

require 'rails_helper'

require 'errors/invalid_association'

RSpec.describe Errors::InvalidAssociation do
  subject(:error) do
    described_class.new(
      association_name: association_name,
      record_class:     record_class
    )
  end

  let(:association_name) { :caster }
  let(:record_class)     { Spell }

  describe '::TYPE' do
    include_examples 'should define constant', :TYPE, 'invalid_association'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:association_name, :record_class)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => {
          'association_name' => association_name.inspect,
          'record_class'     => record_class.name
        },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#message' do
    include_examples 'should have reader', :message

    context 'when the association name is nil' do
      let(:association_name) { nil }
      let(:expected) do
        'nil is not a valid association name.'
      end

      it { expect(error.message).to be == expected }
    end

    context 'when the association name is an Object' do
      let(:association_name) { Object.new.freeze }
      let(:expected) do
        "#{association_name.inspect} is not a valid association name."
      end

      it { expect(error.message).to be == expected }
    end

    context 'when the association name is an empty string' do
      let(:association_name) { '' }
      let(:expected) do
        "#{association_name.inspect} is not a valid association name."
      end

      it { expect(error.message).to be == expected }
    end

    context 'when the association name is a string' do
      let(:association_name) { 'caster' }
      let(:expected) do
        "#{record_class.name} does not define association" \
      " #{association_name.inspect}"
      end

      it { expect(error.message).to be == expected }
    end

    context 'when the association name is a symbol' do
      let(:association_name) { :caster }
      let(:expected) do
        "#{record_class.name} does not define association" \
      " #{association_name.inspect}"
      end

      it { expect(error.message).to be == expected }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end

  describe '#type' do
    include_examples 'should have reader', :type, 'invalid_association'
  end
end
