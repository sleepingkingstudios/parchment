# frozen_string_literal: true

require 'rails_helper'

require 'serializers/attributes_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::AttributesSerializer do
  include Spec::Support::Examples::SerializerExamples

  shared_context 'with a serializer subclass' do
    let(:described_class) { Spec::WidgetSerializer }
    let(:object)          { Spec::Widget.new('Gadget', 'Medium', 'High') }

    example_class 'Spec::Widget', Struct.new(:name, :size, :complexity)

    # rubocop:disable RSpec/DescribedClass
    example_class 'Spec::WidgetSerializer', Serializers::AttributesSerializer
    # rubocop:enable RSpec/DescribedClass
  end

  subject(:serializer) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '.attribute' do
    let(:error_message) do
      'AttributesSerializer is an abstract class and cannot define attributes.'
    end

    it { expect(described_class).to respond_to(:attribute).with(1).argument }

    it 'should raise an error' do
      expect { described_class.attribute :name }
        .to raise_error RuntimeError, error_message
    end

    wrap_context 'with a serializer subclass' do
      it 'should not raise an error' do
        expect { described_class.attribute :name }.not_to raise_error
      end

      describe 'with an attribute name' do
        before(:example) { described_class.attribute :name }

        include_examples 'should serialize attributes', :name
      end
    end
  end

  describe '.attributes' do
    let(:error_message) do
      'AttributesSerializer is an abstract class and cannot define attributes.'
    end

    it 'should define the method' do
      expect(described_class)
        .to respond_to(:attributes)
        .with_unlimited_arguments
    end

    it 'should raise an error' do
      expect { described_class.attributes :name, :size, :complexity }
        .to raise_error RuntimeError, error_message
    end

    wrap_context 'with a serializer subclass' do
      it 'should not raise an error' do
        expect { described_class.attributes :name, :size, :complexity }
          .not_to raise_error
      end

      describe 'with one attribute name' do
        before(:example) { described_class.attributes :name }

        include_examples 'should serialize attributes', :name
      end

      describe 'with many attribute names' do
        before(:example) do
          described_class.attributes :name, :size, :complexity
        end

        include_examples 'should serialize attributes',
          :name,
          :size,
          :complexity
      end
    end
  end

  describe '#call' do
    it { expect(serializer).to respond_to(:call).with(1).argument }

    it { expect(serializer).to alias_method(:call).as(:serialize) }

    it { expect(serializer.call Object.new).to be == {} }

    context 'when the class defines can_serialize?' do
      let(:described_class) { Spec::WidgetSerializer }

      example_class 'Spec::Widget'

      # rubocop:disable RSpec/DescribedClass
      example_class 'Spec::WidgetSerializer',
        Serializers::AttributesSerializer \
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

        it 'should raise an error' do
          expect { serializer.call(nil) }
            .to raise_error error_class, error_message
        end
      end

      describe 'with an object' do
        let(:object)      { Object.new.freeze }
        let(:error_class) { Serializers::InvalidObjectError }
        let(:error_message) do
          "Unable to serialize #{object.inspect} with Spec::WidgetSerializer"
        end

        it 'should raise an error' do
          expect { serializer.call(object) }
            .to raise_error error_class, error_message
        end
      end

      describe 'with a valid object' do
        let(:widget) { Spec::Widget.new }

        it 'should not raise an error' do
          expect { serializer.call(widget) }.not_to raise_error
        end
      end
    end

    context 'when there are many attributes' do
      let(:described_class) { Spec::PersonSerializer }

      example_class 'Spec::Person', Struct.new(:first_name, :last_name, :title)

      # rubocop:disable RSpec/DescribedClass
      example_class 'Spec::PersonSerializer',
        Serializers::AttributesSerializer \
      do |klass|
        klass.attributes :first_name, :last_name, :title
      end
      # rubocop:enable RSpec/DescribedClass

      describe 'with an object with empty properties' do
        let(:object) { Spec::Person.new }

        include_examples 'should serialize attributes',
          :first_name,
          :last_name,
          :title
      end

      describe 'with an object with set properties' do
        let(:object) { Spec::Person.new('Alan', 'Bradley', 'Programmer') }

        include_examples 'should serialize attributes',
          :first_name,
          :last_name,
          :title
      end

      context 'with a subclass' do
        let(:described_class) { Spec::WorkerSerializer }

        example_class 'Spec::Worker',
          Struct.new(:first_name, :last_name, :title, :company)

        example_class 'Spec::WorkerSerializer', 'Spec::PersonSerializer' \
        do |klass|
          klass.attribute :company
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with an object with empty properties' do
          let(:object) { Spec::Worker.new }

          include_examples 'should serialize attributes',
            :first_name,
            :last_name,
            :title,
            :company
        end

        describe 'with an object with set properties' do
          let(:object) do
            Spec::Worker.new('Ed', 'Dillinger', 'Executive', 'Incom')
          end

          include_examples 'should serialize attributes',
            :first_name,
            :last_name,
            :title,
            :company
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end
end
