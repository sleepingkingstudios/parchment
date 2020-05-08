# frozen_string_literal: true

require 'errors/authentication/invalid_header'

RSpec.describe Errors::Authentication::InvalidHeader do
  subject(:error) { described_class.new(header: header) }

  let(:header) { 'Basic YWxhbi5icmFkbGV5QGV4YW1wbGUuY29tOnRyb25saXZlcw==' }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.invalid_header'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:header)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => { 'header' => header },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#header' do
    include_examples 'should have reader', :header, -> { header }
  end

  describe '#message' do
    include_examples 'should have reader',
      :message,
      -> { "Invalid authorization header #{header.inspect}" }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.invalid_header'
  end
end
