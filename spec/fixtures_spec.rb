# frozen_string_literal: true

require 'rails_helper'

require 'fixtures'

RSpec.describe Fixtures do
  describe '::Error' do
    it { expect(described_class::Error).to be_a Class }

    it { expect(described_class::Error).to be < StandardError }
  end

  describe '::FixturesNotDefinedError' do
    it { expect(described_class::FixturesNotDefinedError).to be_a Class }

    it 'should subclass Fixtures::Error' do
      expect(described_class::FixturesNotDefinedError)
        .to be < described_class::Error
    end
  end

  describe '::NotEnoughFixturesError' do
    it { expect(described_class::NotEnoughFixturesError).to be_a Class }

    it 'should subclass Fixtures::Error' do
      expect(described_class::NotEnoughFixturesError)
        .to be < described_class::Error
    end
  end

  describe '::build' do
    let(:record_class) { Spell }
    let(:data) do
      Array.new(3) { FactoryBot.build(:spell) }
    end
    let(:builder) do
      instance_double(described_class::Builder, build: data)
    end

    before(:example) do
      allow(described_class::Builder).to receive(:new).and_return(builder)
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:build)
        .with(1).argument
        .and_keywords(:data_path)
        .and_any_keywords
    end

    it 'should instantiate a builder' do
      described_class.build(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, data_path: 'fixtures')
    end

    it 'should call Builder#build' do
      described_class.build(record_class)

      expect(builder).to have_received(:build).with({})
    end

    it { expect(described_class.build(record_class)).to be data }

    describe 'with count: value' do
      it 'should call Builder#build' do
        described_class.build(record_class, count: 3)

        expect(builder).to have_received(:build).with(count: 3)
      end
    end

    describe 'with data_path: value' do
      let(:data_path) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.build(record_class, data_path: data_path)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, data_path: data_path)
      end
    end

    describe 'with except: array' do
      it 'should call Builder#build' do
        described_class.build(record_class, except: %w[description])

        expect(builder)
          .to have_received(:build)
          .with(except: %w[description])
      end
    end
  end

  describe '::create' do
    let(:record_class) { Spell }
    let(:data) do
      Array.new(3) { FactoryBot.create(:spell) }
    end
    let(:builder) do
      instance_double(described_class::Builder, create: data)
    end

    before(:example) do
      allow(described_class::Builder).to receive(:new).and_return(builder)
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:create)
        .with(1).argument
        .and_keywords(:count, :data_path)
    end

    it 'should instantiate a builder' do
      described_class.create(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, data_path: 'fixtures')
    end

    it 'should call Builder#create' do
      described_class.create(record_class)

      expect(builder).to have_received(:create).with(count: nil)
    end

    it { expect(described_class.create(record_class)).to be data }

    describe 'with count: value' do
      it 'should call Builder#create' do
        described_class.create(record_class, count: 3)

        expect(builder).to have_received(:create).with(count: 3)
      end
    end

    describe 'with data_path: value' do
      let(:data_path) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.create(record_class, data_path: data_path)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, data_path: data_path)
      end
    end
  end

  describe '::exist?' do
    let(:record_class)  { Spell }
    let(:resource_name) { record_class.name.underscore.pluralize }
    let(:loader) do
      instance_double(described_class::Loader, exist?: nil)
    end

    before(:example) do
      allow(described_class::Loader).to receive(:new).and_return(loader)
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:exist?)
        .with(1).argument
        .and_keywords(:data_path)
    end

    it 'should instantiate a loader' do
      described_class.exist?(record_class)

      expect(described_class::Loader)
        .to have_received(:new)
        .with(data_path: 'fixtures', resource_name: resource_name)
    end

    it 'should call Loader#exist?' do
      described_class.exist?(record_class)

      expect(loader).to have_received(:exist?).with(no_args)
    end

    context 'when the fixtures do not exist' do
      before(:example) do
        allow(loader).to receive(:exist?).and_return(false)
      end

      it { expect(described_class.exist?(record_class)).to be false }
    end

    context 'when the fixtures exist' do
      before(:example) do
        allow(loader).to receive(:exist?).and_return(true)
      end

      it { expect(described_class.exist?(record_class)).to be true }
    end
  end

  describe '::read' do
    let(:record_class) { Spell }
    let(:data) do
      Array.new(3) { FactoryBot.attributes_for(:spell) }
    end
    let(:builder) do
      instance_double(described_class::Builder, read: data)
    end
    let(:options) do
      {
        count:           nil,
        skip_middleware: false
      }
    end

    before(:example) do
      allow(described_class::Builder).to receive(:new).and_return(builder)
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:read)
        .with(1).argument
        .and_keywords(:count, :data_path)
    end

    it 'should instantiate a builder' do
      described_class.read(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, data_path: 'fixtures')
    end

    it 'should call Builder#read' do
      described_class.read(record_class)

      expect(builder).to have_received(:read).with(options)
    end

    it { expect(described_class.read(record_class)).to be data }

    describe 'with count: value' do
      it 'should call Builder#read' do
        described_class.read(record_class, count: 3)

        expect(builder).to have_received(:read).with(options.merge(count: 3))
      end
    end

    describe 'with data_path: value' do
      let(:data_path) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.read(record_class, data_path: data_path)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, data_path: data_path)
      end
    end

    describe 'with skip_middleware: true' do
      it 'should call Builder#read' do
        described_class.read(record_class, skip_middleware: true)

        expect(builder)
          .to have_received(:read)
          .with(options.merge(skip_middleware: true))
      end
    end
  end
end
