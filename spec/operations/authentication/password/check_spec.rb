# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/password/check'

RSpec.describe Operations::Authentication::Password::Check do
  subject(:operation) { described_class.new(credential) }

  let(:password) { 'password' }
  let(:credential) do
    FactoryBot.create(:password_credential, :with_user, password: password)
  end

  describe '.new' do
    let(:error_message) do
      'credential must be an Authentication::PasswordCredential'
    end

    it { expect(described_class).to be_constructible.with(1).argument }

    describe 'with nil' do
      it 'should raise an error' do
        expect { described_class.new nil }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with an object' do
      it 'should raise an error' do
        expect { described_class.new Object.new.freeze }
          .to raise_error ArgumentError, error_message
      end
    end

    describe 'with a credential' do
      it 'should raise an error' do
        expect { described_class.new Authentication::Credential.new }
          .to raise_error ArgumentError, error_message
      end
    end
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty String' do
      let(:expected_error) { Errors::Authentication::InvalidPassword.new }

      it 'should return a failing result' do
        expect(operation.call '')
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a non-matching String' do
      let(:expected_error) { Errors::Authentication::IncorrectPassword.new }

      it 'should return a failing result' do
        expect(operation.call '12345')
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a matching String' do
      it 'should return a passing result' do
        expect(operation.call password)
          .to have_passing_result
          .with_value(credential)
      end
    end

    context 'when the credential has an invalid encrypted password' do
      let(:credential) do
        FactoryBot.create(
          :password_credential,
          :with_user,
          encrypted_password: 'xyzzy'
        )
      end
      let(:expected_error) { Errors::Authentication::InvalidHash.new }

      it 'should return a failing result' do
        expect(operation.call '12345')
          .to have_failing_result
          .with_error(expected_error)
      end
    end
  end

  describe '#credential' do
    include_examples 'should have reader', :credential, -> { credential }
  end
end
