# frozen_string_literal: true

require 'serializers/value_serializer'

RSpec.describe Serializers::ValueSerializer do
  subject(:serializer) { described_class.new }

  describe '::LITERAL_TYPES' do
    let(:expected) do
      [
        FalseClass,
        Float,
        NilClass,
        Integer,
        String,
        TrueClass
      ]
    end

    include_examples 'should define frozen constant',
      :LITERAL_TYPES,
      -> { an_instance_of(Set) }

    it { expect(described_class::LITERAL_TYPES).to contain_exactly(*expected) }
  end

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(serializer).to respond_to(:call).with(1).argument }

    it { expect(serializer).to alias_method(:call).as(:serialize) }

    describe 'with nil' do
      it { expect(serializer.call nil).to be nil }
    end

    describe 'with false' do
      it { expect(serializer.call false).to be false }
    end

    describe 'with true' do
      it { expect(serializer.call true).to be true }
    end

    describe 'with an integer' do
      it { expect(serializer.call 1).to be 1 }
    end

    describe 'with a float' do
      it { expect(serializer.call 1.0).to be == 1.0 }
    end

    describe 'with a float' do
      it { expect(serializer.call 'string').to be == 'string' }
    end

    describe 'with an object' do
      let(:object)      { Object.new.freeze }
      let(:error_class) { Serializers::InvalidObjectError }
      let(:error_message) do
        "Unable to serialize #{object.inspect} with #{described_class.name}"
      end

      it 'should raise an error' do
        expect { serializer.call(object) }
          .to raise_error error_class, error_message
      end
    end
  end
end
