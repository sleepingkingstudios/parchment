# frozen_string_literal: true

require 'errors/server/missing_session_key'

RSpec.describe Errors::Server::MissingSessionKey do
  subject(:error) { described_class.new }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'server.missing_session_key'
  end

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
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
      -> { 'Session key is not configured or is empty' }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'server.missing_session_key'
  end
end
