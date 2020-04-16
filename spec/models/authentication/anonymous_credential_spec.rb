# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/credential_examples'

RSpec.describe Authentication::AnonymousCredential, type: :model do
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
    it 'should return the credential type' do
      expect(credential.type).to be == 'Authentication::AnonymousCredential'
    end
  end

  describe '#valid?' do
    context 'when the user is an admin user' do
      let(:user) { FactoryBot.create(:admin) }

      before(:example) { credential.user = user }

      it 'should validate the user role' do
        expect(credential)
          .to have_errors
          .on(:user)
          .with_message('must be an anonymous user')
      end
    end

    context 'when the user is an anonymous user' do
      let(:user) { Authentication::User.anonymous }

      before(:example) { credential.user = user }

      it { expect(credential).to be_valid }
    end

    context 'when the user is a user' do
      let(:user) { FactoryBot.create(:user) }

      before(:example) { credential.user = user }

      it 'should validate the user role' do
        expect(credential)
          .to have_errors
          .on(:user)
          .with_message('must be an anonymous user')
      end
    end
  end
end
