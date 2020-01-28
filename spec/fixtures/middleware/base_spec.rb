# frozen_string_literal: true

require 'fixtures/middleware/base'

RSpec.describe Fixtures::Middleware::Base do
  shared_context 'when the middleware is initialized with options' do
    let(:options) { { option: 'value' } }
  end

  subject(:middleware) { described_class.new(**options) }

  let(:options) { {} }

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_any_keywords
    end
  end

  describe '#call' do
    let(:next_result)  { Cuprum::Result.new }
    let(:next_command) { instance_double(Cuprum::Command, call: next_result) }
    let(:data)         { { key: 'value' } }

    it { expect(middleware).to respond_to(:call).with(2).arguments }

    it 'should call the next command' do
      middleware.call(next_command, data)

      expect(next_command).to have_received(:call).with(data)
    end

    it 'should return the result of the next command' do
      expect(middleware.call(next_command, data).to_cuprum_result)
        .to be == next_result
    end

    context 'when the middleware is partially applied' do
      let(:curried) { middleware.curry(next_command) }

      it 'should call the next command' do
        curried.call(data)

        expect(next_command).to have_received(:call).with(data)
      end

      it 'should return the result of the next command' do
        expect(curried.call(data).to_cuprum_result).to be == next_result
      end
    end
  end

  describe '#options' do
    include_examples 'should have reader', :options, -> { be == options }

    wrap_context 'when the middleware is initialized with options' do
      it { expect(middleware.options).to be == options }
    end
  end
end
