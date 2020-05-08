# frozen_string_literal: true

require 'rails_helper'

require 'serializers/base_serializer'

RSpec.describe Serializers::BaseSerializer do
  subject(:serializer) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:object) { Object.new.freeze }
    let(:error_message) do
      Serializers::UndefinedSerializerError.message(object)
    end

    it { expect(serializer).to respond_to(:call).with(1).argument }

    it { expect(serializer).to alias_method(:call).as(:serialize) }

    it 'should raise an error' do
      expect { serializer.call object }
        .to raise_error Serializers::UndefinedSerializerError, error_message
    end

    context 'when the class defines can_serialize?' do
      let(:described_class) { Spec::WidgetSerializer }

      example_class 'Spec::Widget'

      # rubocop:disable RSpec/DescribedClass
      example_class 'Spec::WidgetSerializer', Serializers::BaseSerializer \
      do |klass|
        klass.define_method(:can_serialize?) do |object|
          object.is_a?(Spec::Widget)
        end
      end
      # rubocop:enable RSpec/DescribedClass

      describe 'with nil' do
        let(:error_class) { Serializers::InvalidObjectError }
        let(:error_message) do
          'Unable to serialize nil with Spec::WidgetSerializer'
        end

        it 'should raise an invalid object error' do
          expect { serializer.call(nil) }
            .to raise_error error_class, error_message
        end
      end

      describe 'with an object' do
        let(:object) { Object.new.freeze }
        let(:error_message) do
          "Unable to serialize #{object.inspect} with Spec::WidgetSerializer"
        end

        it 'should raise an invalid object error' do
          expect { serializer.call(object) }
            .to raise_error Serializers::InvalidObjectError, error_message
        end
      end

      describe 'with a valid object' do
        let(:widget) { Spec::Widget.new }
        let(:error_message) do
          Serializers::UndefinedSerializerError.message(widget)
        end

        it 'should raise an undefined serializer error' do
          expect { serializer.call widget }
            .to raise_error Serializers::UndefinedSerializerError, error_message
        end
      end
    end
  end
end
