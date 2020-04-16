# frozen_string_literal: true

require 'errors/authentication/invalid_session'

RSpec.describe Errors::Authentication::InvalidSession do
  subject(:error) { described_class.new }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.invalid_session'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
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
      'Session must be an instance of Authorization::Session'
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.invalid_session'
  end
end
