# frozen_string_literal: true

require 'rails_helper'

require 'serializers/string_serializer'

RSpec.describe Serializers::StringSerializer do
  subject(:serializer) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(serializer).to respond_to(:call).with(1).argument }

    it { expect(serializer).to alias_method(:call).as(:serialize) }

    describe 'with nil' do
      let(:error_message) do
        'Unable to serialize nil with Serializers::StringSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call nil }
          .to raise_error Serializers::InvalidObjectError, error_message
      end
    end

    describe 'with an Object' do
      let(:object) { Object.new.freeze }
      let(:error_message) do
        "Unable to serialize #{object.inspect} with" \
        ' Serializers::StringSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call object }
          .to raise_error Serializers::InvalidObjectError, error_message
      end
    end

    describe 'with a String' do
      let(:string) { 'Greetings, programs!' }

      it { expect(serializer.call string).to be == string }
    end
  end
end
