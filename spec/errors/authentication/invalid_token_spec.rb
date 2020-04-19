# frozen_string_literal: true

require 'errors/authentication/invalid_token'

RSpec.describe Errors::Authentication::InvalidToken do
  subject(:error) { described_class.new(token: token) }

  let(:token) { '12345' }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.invalid_token'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:token)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => { 'token' => token },
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
      -> { "Invalid authorization token #{token.inspect}" }
  end

  describe '#token' do
    include_examples 'should have reader', :token, -> { token }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.invalid_token'
  end
end
