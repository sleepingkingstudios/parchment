# frozen_string_literal: true

require 'rails_helper'

require 'serializers'

RSpec.describe Serializers do
  describe '::InvalidObjectError' do
    include_examples 'should define constant', :UndefinedSerializerError

    it { expect(described_class::UndefinedSerializerError).to be_a Class }

    it 'should be an exception class' do
      expect(described_class::UndefinedSerializerError)
        .to be < described_class::SerializerError
    end

    describe '::message' do
      let(:described_class) { Serializers::InvalidObjectError }
      let(:object)          { Object.new.freeze }
      let(:serializer)      { Serializers::SpellSerializer.new }
      let(:message) do
        described_class.message(
          object:     object,
          serializer: serializer
        )
      end
      let(:expected) do
        "Unable to serialize #{object.inspect} with" \
        ' Serializers::SpellSerializer'
      end

      it 'should define the class method' do
        expect(described_class)
          .to respond_to(:message)
          .with(0).arguments
          .and_keywords(:object, :serializer)
      end

      it { expect(message).to be == expected }
    end
  end

  describe '::SerializerError' do
    include_examples 'should define constant', :SerializerError

    it { expect(described_class::SerializerError).to be_a Class }

    it 'should be an exception class' do
      expect(described_class::SerializerError).to be < StandardError
    end
  end

  describe '::UndefinedSerializerError' do
    include_examples 'should define constant', :UndefinedSerializerError

    it { expect(described_class::UndefinedSerializerError).to be_a Class }

    it 'should be an exception class' do
      expect(described_class::UndefinedSerializerError)
        .to be < described_class::SerializerError
    end

    describe '::message' do
      let(:described_class) { Serializers::UndefinedSerializerError }

      it { expect(described_class).to respond_to(:message).with(1).argument }

      describe 'with a Class' do
        let(:expected) { 'No serializer defined for Object' }

        it { expect(described_class.message Object).to be == expected }
      end

      describe 'with an Object' do
        let(:expected) { 'No serializer defined for Object' }

        it { expect(described_class.message Object.new).to be == expected }
      end

      describe 'with a String' do
        let(:expected) { 'No serializer defined for Object' }

        it { expect(described_class.message 'Object').to be == expected }
      end
    end
  end

  describe '::serialize' do
    it { expect(described_class).to respond_to(:serialize).with(1).argument }

    describe 'with nil' do
      it { expect(described_class.serialize(nil)).to be nil }
    end

    describe 'with false' do
      it { expect(described_class.serialize(false)).to be false }
    end

    describe 'with true' do
      it { expect(described_class.serialize(true)).to be true }
    end

    describe 'with a Float' do
      it { expect(described_class.serialize(1.0)).to be == 1.0 }
    end

    describe 'with an Integer' do
      it { expect(described_class.serialize(1)).to be 1 }
    end

    describe 'with a String' do
      it { expect(described_class.serialize('string')).to be == 'string' }
    end

    describe 'with an object with no serializer' do
      let(:error_class)   { described_class::UndefinedSerializerError }
      let(:error_message) { 'No serializer defined for Object' }

      it 'should raise an error' do
        expect { described_class.serialize(Object.new.freeze) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with an object with a defined serializer' do
      let(:object)   { FactoryBot.build(:spell) }
      let(:expected) { Serializers::SpellSerializer.new.serialize(object) }

      it { expect(described_class.serialize(object)).to be == expected }
    end
  end

  describe '::serializer_class_for' do
    it 'should define the method' do
      expect(described_class)
        .to respond_to(:serializer_class_for)
        .with(1).argument
    end

    describe 'with nil' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(nil))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with false' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(false))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with true' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(true))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a Float' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(1.0))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with an Integer' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(1))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a String' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for('string'))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with FalseClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(FalseClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with Float' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(Float))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with Integer' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(Integer))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with NilClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(NilClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with String' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(String))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with TrueClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for(TrueClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a class with no serializer' do
      it { expect(described_class.serializer_class_for(Object)).to be nil }
    end

    describe 'with an object with no serializer' do
      it { expect(described_class.serializer_class_for(Object.new)).to be nil }
    end

    describe 'with a class with a defined serializer' do
      it 'should return the serializer class' do
        expect(described_class.serializer_class_for(Spell))
          .to be Serializers::SpellSerializer
      end
    end

    describe 'with an object with a defined serializer' do
      it 'should return the serializer class' do
        expect(described_class.serializer_class_for(Spell.new))
          .to be Serializers::SpellSerializer
      end
    end
  end

  describe '::serializer_class_for!' do
    it 'should define the method' do
      expect(described_class)
        .to respond_to(:serializer_class_for!)
        .with(1).argument
    end

    describe 'with nil' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(nil))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with false' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(false))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with true' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(true))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a Float' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(1.0))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with an Integer' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(1))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a String' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!('string'))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with FalseClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(FalseClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with Float' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(Float))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with Integer' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(Integer))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with NilClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(NilClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with String' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(String))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with TrueClass' do
      it 'should return ValueSerializer' do
        expect(described_class.serializer_class_for!(TrueClass))
          .to be Serializers::ValueSerializer
      end
    end

    describe 'with a class with no serializer' do
      let(:error_class)   { described_class::UndefinedSerializerError }
      let(:error_message) { 'No serializer defined for Object' }

      it 'should raise an error' do
        expect { described_class.serializer_class_for!(Object) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with an object with no serializer' do
      let(:error_class)   { described_class::UndefinedSerializerError }
      let(:error_message) { 'No serializer defined for Object' }

      it 'should raise an error' do
        expect { described_class.serializer_class_for!(Object.new) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with a class with a defined serializer' do
      it 'should return the serializer class' do
        expect(described_class.serializer_class_for!(Spell))
          .to be Serializers::SpellSerializer
      end
    end

    describe 'with an object with a defined serializer' do
      it 'should return the serializer class' do
        expect(described_class.serializer_class_for!(Spell.new))
          .to be Serializers::SpellSerializer
      end
    end
  end

  describe '::serializer_for!' do
    it 'should define the method' do
      expect(described_class)
        .to respond_to(:serializer_for!)
        .with(1).argument
    end

    describe 'with nil' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(nil))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with false' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(false))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with true' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(true))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with a Float' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(1.0))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with an Integer' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(1))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with a String' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!('string'))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with FalseClass' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(FalseClass))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with Float' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(Float))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with Integer' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(Integer))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with NilClass' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(NilClass))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with String' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(String))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with TrueClass' do
      it 'should return an instance of ValueSerializer' do
        expect(described_class.serializer_for!(TrueClass))
          .to be_a Serializers::ValueSerializer
      end
    end

    describe 'with a class with no serializer' do
      let(:error_class)   { described_class::UndefinedSerializerError }
      let(:error_message) { 'No serializer defined for Object' }

      it 'should raise an error' do
        expect { described_class.serializer_for!(Object) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with an object with no serializer' do
      let(:error_class)   { described_class::UndefinedSerializerError }
      let(:error_message) { 'No serializer defined for Object' }

      it 'should raise an error' do
        expect { described_class.serializer_for!(Object.new) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with a class with a defined serializer' do
      it 'should return the serializer' do
        expect(described_class.serializer_for!(Spell))
          .to be_a Serializers::SpellSerializer
      end
    end

    describe 'with an object with a defined serializer' do
      it 'should return the serializer' do
        expect(described_class.serializer_for!(Spell.new))
          .to be_a Serializers::SpellSerializer
      end
    end
  end
end
