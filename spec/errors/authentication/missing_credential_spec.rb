# frozen_string_literal: true

require 'errors/authentication/missing_credential'

RSpec.describe Errors::Authentication::MissingCredential do
  subject(:error) { described_class.new(credential_id: credential_id) }

  let(:credential_id) { '00000000-0000-0000-0000-000000000000' }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.missing_credential'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:credential_id)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => { 'credential_id' => credential_id },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#credential_id' do
    include_examples 'should have reader', :credential_id, -> { credential_id }
  end

  describe '#message' do
    include_examples 'should have reader',
      :message,
      -> { "Credential not found with id #{credential_id.inspect}" }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.missing_credential'
  end
end
