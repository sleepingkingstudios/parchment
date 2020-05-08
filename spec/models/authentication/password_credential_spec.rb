# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/credential_examples'

RSpec.describe Authentication::PasswordCredential, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::CredentialExamples

  subject(:credential) { described_class.new(attributes) }

  let(:attributes) do
    {
      active:     true,
      data:       {
        'encrypted_password' => 'MTIzNDU='
      },
      expires_at: 1.year.from_now
    }
  end

  include_examples 'should implement the credential methods'

  include_examples 'should have timestamps'

  describe '#encrypted_password' do
    include_examples 'should have property',
      :encrypted_password,
      'MTIzNDU='
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the credential is persisted' do
      include_context 'when the credential belongs to a user'

      before(:example) { credential.save! }

      it { expect(credential.id).to be_a_uuid }
    end
  end

  describe '#type' do
    it { expect(credential.type).to be == 'Authentication::PasswordCredential' }
  end

  describe '#valid?' do
    it 'should validate the presence of the user' do
      expect(credential).to have_errors.on(:user).with_message('must exist')
    end

    context 'when the encrypted password is nil' do
      let(:attributes) { super().merge(data: {}) }

      it 'should validate the presence of the encrypted password' do
        expect(credential)
          .to have_errors
          .on(:encrypted_password)
          .with_message("can't be blank")
      end
    end

    context 'when the encrypted password is empty' do
      let(:attributes) { super().merge(data: '') }

      it 'should validate the presence of the encrypted password' do
        expect(credential)
          .to have_errors
          .on(:encrypted_password)
          .with_message("can't be blank")
      end
    end

    wrap_context 'when the credential belongs to a user' do
      it { expect(credential).to be_valid }
    end
  end
end
