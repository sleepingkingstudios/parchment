# frozen_string_literal: true

require 'errors/server/base'

RSpec.describe Errors::Server::Base do
  subject(:error) { described_class.new }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'server.base'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:message)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#message' do
    include_examples 'should have reader',
      :message,
      -> { 'Server is unable to process request' }

    context 'when initialized with a message' do
      let(:message) { 'Something went wrong.' }
      let(:error)   { described_class.new(message: message) }

      it { expect(error.message).to be == message }
    end
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'server.base'
  end
end
