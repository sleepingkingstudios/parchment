# frozen_string_literal: true

require 'errors/authentication/missing_token'

RSpec.describe Errors::Authentication::MissingToken do
  subject(:error) { described_class.new }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.missing_token'
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
      -> { "Authorization token can't be blank" }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.missing_token'
  end
end
