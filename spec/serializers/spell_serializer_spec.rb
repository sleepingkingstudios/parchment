# frozen_string_literal: true

require 'rails_helper'

require 'serializers/spell_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::SpellSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:spell) { FactoryBot.build(:spell) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { spell }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :casting_time,
      :description,
      :duration,
      :level,
      :material_component,
      :name,
      :range,
      :ritual,
      :school,
      :short_description,
      :slug,
      :somatic_component,
      :verbal_component

    describe 'with nil' do
      let(:error_class) { Serializers::InvalidObjectError }
      let(:error_message) do
        'Unable to serialize nil with Serializers::SpellSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call(nil) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with an object' do
      let(:object)      { Object.new.freeze }
      let(:error_class) { Serializers::InvalidObjectError }
      let(:error_message) do
        "Unable to serialize #{object.inspect} with" \
        ' Serializers::SpellSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call(object) }
          .to raise_error error_class, error_message
      end
    end
  end
end
