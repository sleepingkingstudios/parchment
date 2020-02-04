# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

RSpec.describe Fixtures::Builder do
  shared_context 'with a custom data path' do
    subject(:builder) do
      described_class.new(record_class, data_path: data_path)
    end

    let(:data_path) { 'secrets' }
  end

  shared_context 'when data is defined for the resource' do
    let(:data) do
      [
        {
          'id'                 => '00000000-0000-0000-0000-000000000000',
          'name'               => 'Fireball',
          'casting_time'       => '1 action',
          'description'        => 'A big ball of fire.',
          'duration'           => 'Instantaneous',
          'level'              => 3,
          'range'              => '100 feet',
          'school'             => 'evocation',
          'short_description'  => '',
          'material_component' => '',
          'somatic_component'  => false,
          'verbal_component'   => false
        },
        {
          'id'                 => '00000000-0000-0000-0000-000000000001',
          'name'               => 'Lightning Bolt',
          'casting_time'       => '1 action',
          'description'        => 'A forking bolt of lightning.',
          'duration'           => 'Instantaneous',
          'level'              => 3,
          'range'              => '100 feet',
          'school'             => 'evocation',
          'short_description'  => '',
          'material_component' => '',
          'somatic_component'  => false,
          'verbal_component'   => false
        },
        {
          'id'                 => '00000000-0000-0000-0000-000000000002',
          'name'               => 'Magic Missile',
          'casting_time'       => '1 action',
          'description'        => 'A scintillating bolt of magic.',
          'duration'           => 'Instantaneous',
          'level'              => 1,
          'range'              => '30 feet',
          'school'             => 'evocation',
          'short_description'  => '',
          'material_component' => '',
          'somatic_component'  => false,
          'verbal_component'   => false
        }
      ]
    end
  end

  shared_context 'when options[:middleware] is defined for the resource' do
    let(:opts) do
      {
        'middleware' => [
          {
            'options' => { 'property' => 'name' },
            'type'    => 'Spec::UpcaseProperty'
          }
        ]
      }
    end

    example_class 'Spec::UpcaseProperty', Fixtures::Middleware::Base do |klass|
      klass.send(:define_method, :process) do |next_command, data|
        prop  = options[:property]
        value = data[prop].upcase
        data  = data.merge(prop => value)

        super(next_command, data)
      end
    end
  end

  shared_examples 'should filter the data' do
    def match_attributes?(actual_item, expected_item)
      actual_item.attributes == expected_item.attributes
    end

    def match_expected
      satisfy do |actual|
        actual.zip(expected).each do |actual_item, expected_item|
          expect(actual_item)
            .to be_a(expected_item.class)
            .and(match_expected_item(expected_item))
        end
      end
    end

    def match_expected_item(expected_item)
      satisfy do |actual_item|
        next actual_item == expected_item if actual_item.is_a?(Hash)

        match_attributes?(actual_item, expected_item) &&
          match_persisted?(actual_item, expected_item)
      end
    end

    def match_persisted?(actual_item, expected_item)
      actual_item.persisted? == expected_item.persisted?
    end

    it 'should return an empty array' do
      expect(build_fixtures).to be == []
    end

    describe 'with count: 0' do
      let(:options) { super().merge(count: 0) }

      it 'should return an empty array' do
        expect(build_fixtures).to be == []
      end
    end

    describe 'with count: 1' do
      let(:options) { super().merge(count: 1) }
      let(:error_message) do
        'Requested 1 spell, but the data is empty'
      end

      it 'should raise an error' do
        expect { build_fixtures }
          .to raise_error Fixtures::NotEnoughFixturesError, error_message
      end
    end

    describe 'with count: 3' do
      let(:options) { super().merge(count: 3) }
      let(:error_message) do
        'Requested 3 spells, but the data is empty'
      end

      it 'should raise an error' do
        expect { build_fixtures }
          .to raise_error Fixtures::NotEnoughFixturesError, error_message
      end
    end

    describe 'with except: array' do
      let(:except) do
        %w[material_component somatic_component verbal_component]
      end
      let(:options) { super().merge(except: except) }

      it 'should return an empty array' do
        expect(build_fixtures).to be == []
      end
    end

    describe 'with except: value' do
      let(:options) { super().merge(except: 'material_component') }

      it 'should return an empty array' do
        expect(build_fixtures).to be == []
      end
    end

    wrap_context 'when data is defined for the resource' do
      it 'should return the results' do
        expect(build_fixtures).to be == expected
      end

      describe 'with count: 0' do
        let(:options) { super().merge(count: 0) }

        it 'should return an empty array' do
          expect(build_fixtures).to be == []
        end
      end

      describe 'with count: 1' do
        let(:options) { super().merge(count: 1) }

        it 'should return the first item' do
          expect(build_fixtures).to be == expected[0...1]
        end
      end

      describe 'with count: 3' do
        let(:options) { super().merge(count: 3) }

        it 'should return the first 3 items' do
          expect(build_fixtures).to be == expected[0...3]
        end
      end

      describe 'with count: 6' do
        let(:options) { super().merge(count: 6) }
        let(:error_message) do
          'Requested 6 spells, but there are only 3 spells'
        end

        it 'should raise an error' do
          expect { build_fixtures }
            .to raise_error Fixtures::NotEnoughFixturesError, error_message
        end
      end

      describe 'with except: array' do
        let(:except) do
          %w[material_component somatic_component verbal_component]
        end
        let(:options) { super().merge(except: except) }
        let(:expected_data) do
          data.map { |item| item.except(*except) }
        end

        it 'should filter the data' do
          expect(build_fixtures).to match_expected
        end
      end

      describe 'with except: value' do
        let(:options) { super().merge(except: 'material_component') }
        let(:expected_data) do
          data.map { |item| item.except('material_component') }
        end

        it 'should filter the data' do
          expect(build_fixtures).to match_expected
        end
      end

      wrap_context 'when options[:middleware] is defined for the resource' do
        let(:expected_data) do
          data.map { |item| item.merge('name' => item['name'].upcase) }
        end

        it 'should map the data' do
          expect(build_fixtures).to match_expected
        end
      end
    end

    wrap_context 'when options[:middleware] is defined for the resource' do
      it 'should return an empty array' do
        expect(builder.read).to be == []
      end
    end
  end

  subject(:builder) { described_class.new(record_class) }

  let(:record_class) { Spell }
  let(:data_path)  { 'fixtures' }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:data_path)
    end
  end

  describe '#build' do
    let(:data) { [] }
    let(:opts) { {} }
    let(:loader) do
      instance_double(Fixtures::Loader, call: nil, data: data, options: opts)
    end
    let(:resource_name) { record_class.name.underscore.pluralize }
    let(:expected_data) { data }
    let(:expected) do
      build_command = Spell::Factory.build

      expected_data.map { |attributes| build_command.call(attributes).value }
    end
    let(:options) { {} }

    def build_fixtures
      builder.build(**options)
    end

    before(:example) do
      allow(Fixtures::Loader).to receive(:new).and_return(loader)

      allow(loader).to receive(:call).and_return(loader)
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:build)
        .with(0).arguments
        .and_keywords(:count, :except)
    end

    it 'should delegate to a loader' do
      builder.build

      expect(Fixtures::Loader).to have_received(:new).with(
        data_path:     data_path,
        resource_name: resource_name
      )
    end

    it 'should call the loader' do
      builder.build

      expect(loader).to have_received(:call).with(no_args)
    end

    include_examples 'should filter the data'
  end

  describe '#create' do
    let(:data) { [] }
    let(:opts) { {} }
    let(:loader) do
      instance_double(Fixtures::Loader, call: nil, data: data, options: opts)
    end
    let(:resource_name) { record_class.name.underscore.pluralize }
    let(:expected_data) { data }
    let(:expected) do
      create_command = Spell::Factory.create

      expected_data.map { |attributes| create_command.call(attributes).value }
    end
    let(:options) { {} }

    def build_fixtures
      builder.create(**options)
    end

    before(:example) do
      allow(Fixtures::Loader).to receive(:new).and_return(loader)

      allow(loader).to receive(:call).and_return(loader)

      expected
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:create)
        .with(0).arguments
        .and_keywords(:count, :except)
    end

    it 'should delegate to a loader' do
      builder.create

      expect(Fixtures::Loader).to have_received(:new).with(
        data_path:     data_path,
        resource_name: resource_name
      )
    end

    it 'should call the loader' do
      builder.create

      expect(loader).to have_received(:call).with(no_args)
    end

    include_examples 'should filter the data'
  end

  describe '#data_path' do
    include_examples 'should have reader', :data_path, 'fixtures'

    wrap_context 'with a custom data path' do
      it { expect(builder.data_path).to be data_path }
    end
  end

  describe '#read' do
    let(:data) { [] }
    let(:opts) { {} }
    let(:loader) do
      instance_double(Fixtures::Loader, call: nil, data: data, options: opts)
    end
    let(:resource_name) { record_class.name.underscore.pluralize }
    let(:expected_data) { data }
    let(:expected)      { expected_data }
    let(:options)       { {} }

    def build_fixtures
      builder.read(**options)
    end

    before(:example) do
      allow(Fixtures::Loader).to receive(:new).and_return(loader)

      allow(loader).to receive(:call).and_return(loader)
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:read)
        .with(0).arguments
        .and_keywords(:count, :except)
    end

    it 'should delegate to a loader' do
      builder.read

      expect(Fixtures::Loader).to have_received(:new).with(
        data_path:     data_path,
        resource_name: resource_name
      )
    end

    it 'should call the loader' do
      builder.read

      expect(loader).to have_received(:call).with(no_args)
    end

    include_examples 'should filter the data'
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
