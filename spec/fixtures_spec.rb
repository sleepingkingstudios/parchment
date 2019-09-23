# frozen_string_literal: true

require 'rails_helper'

require 'fixtures'

RSpec.describe Fixtures do
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
    end

    it 'should instantiate a builder' do
      described_class.build(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
    end

    it 'should call Builder#build' do
      described_class.build(record_class)

      expect(builder).to have_received(:build)
    end

    it { expect(described_class.build(record_class)).to be data }

    describe 'with environment: value' do
      let(:environment) { 'secrets' }

      it 'should instantiate a builder' do
        described_class.build(record_class, environment: environment)

        expect(described_class::Builder)
          .to have_received(:new)
          .with(record_class, environment: environment)
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
        .and_keywords(:environment)
    end

    it 'should instantiate a builder' do
      described_class.create(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
    end

    it 'should call Builder#create' do
      described_class.create(record_class)

      expect(builder).to have_received(:create)
    end

    it { expect(described_class.create(record_class)).to be data }

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
        .and_keywords(:environment)
    end

    it 'should instantiate a builder' do
      described_class.read(record_class)

      expect(described_class::Builder)
        .to have_received(:new)
        .with(record_class, environment: 'fixtures')
    end

    it 'should call Builder#read' do
      described_class.read(record_class)

      expect(builder).to have_received(:read)
    end

    it { expect(described_class.read(record_class)).to be data }

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
