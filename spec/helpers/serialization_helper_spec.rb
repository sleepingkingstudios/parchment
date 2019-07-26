# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SerializationHelper do
  subject(:helper) { Object.new.extend(described_class) }

  describe '#serialize' do
    shared_context 'with a custom serializer' do
      example_class 'Spec::ComponentSerializer', ApplicationSerializer \
      do |klass|
        klass.attributes \
          :material_component,
          :somatic_component,
          :verbal_component
      end
    end

    it 'should define the method' do
      expect(helper)
        .to respond_to(:serialize)
        .with(1).argument
        .and_keywords(:serializer)
    end

    describe 'with an object with no serializer' do
      let(:error_message) { 'no serializer defined for NilClass' }

      it 'should raise an error' do
        expect { serialize(nil) }.to raise_error RuntimeError, error_message
      end
    end

    describe 'with an object with a defined serializer' do
      let(:object)   { FactoryBot.build(:spell) }
      let(:expected) { SpellSerializer.new.serialize(object) }

      it { expect(serialize(object)).to be == expected }
    end

    describe 'with an object and a serializer class' do
      include_context 'with a custom serializer'

      let(:object)   { FactoryBot.build(:spell) }
      let(:expected) { Spec::ComponentSerializer.new.serialize(object) }

      it 'should instantiate the serializer class' do
        expect(serialize(object, serializer: Spec::ComponentSerializer))
          .to be == expected
      end
    end

    describe 'with an object and a serializer instance' do
      include_context 'with a custom serializer'

      let(:object)   { FactoryBot.build(:spell) }
      let(:expected) { Spec::ComponentSerializer.new.serialize(object) }

      it 'should instantiate the serializer class' do
        expect(serialize(object, serializer: Spec::ComponentSerializer.new))
          .to be == expected
      end
    end
  end
end
