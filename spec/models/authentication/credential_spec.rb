# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/credential_examples'

RSpec.describe Authentication::Credential, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::CredentialExamples

  subject(:credential) { described_class.new(attributes) }

  let(:attributes) do
    {
      active:     true,
      data:       {},
      expires_at: 1.year.from_now
    }
  end

  include_examples 'should implement the credential methods'

  include_examples 'should have timestamps'

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'
  end

  describe '#type' do
    it { expect(credential.type).to be nil }
  end
end
