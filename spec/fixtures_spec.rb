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
    let(:record_class) { Publication }
    let(:data) do
      Array.new(3) { FactoryBot.build(:publication) }
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
        .and_keywords(:environment)
        .and_any_keywords
    end

    it 'should instantiate a builder' do
      described_class.build(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
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

    describe 'with environment: value' do
      let(:environment) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.build(record_class, environment: environment)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, environment: environment)
      end
    end

    describe 'with except: array' do
      it 'should call Builder#build' do
        described_class.build(record_class, except: %w[publication_date])

        expect(builder)
          .to have_received(:build)
          .with(except: %w[publication_date])
      end
    end
  end

  describe '::create' do
    let(:record_class) { Publication }
    let(:data) do
      Array.new(3) { FactoryBot.create(:publication) }
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
        .and_keywords(:count, :environment)
    end

    it 'should instantiate a builder' do
      described_class.create(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
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

    describe 'with environment: value' do
      let(:environment) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.create(record_class, environment: environment)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, environment: environment)
      end
    end
  end

  describe '::read' do
    let(:record_class) { Publication }
    let(:data) do
      Array.new(3) { FactoryBot.attributes_for(:publication) }
    end
    let(:builder) do
      instance_double(described_class::Builder, read: data)
    end

    before(:example) do
      allow(described_class::Builder).to receive(:new).and_return(builder)
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:read)
        .with(1).argument
        .and_keywords(:count, :environment)
    end

    it 'should instantiate a builder' do
      described_class.read(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
    end

    it 'should call Builder#read' do
      described_class.read(record_class)

      expect(builder).to have_received(:read).with(count: nil)
    end

    it { expect(described_class.read(record_class)).to be data }

    describe 'with count: value' do
      it 'should call Builder#read' do
        described_class.read(record_class, count: 3)

        expect(builder).to have_received(:read).with(count: 3)
      end
    end

    describe 'with environment: value' do
      let(:environment) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.read(record_class, environment: environment)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, environment: environment)
      end
    end
  end
end
