# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/middleware/set_password'

require 'support/examples/operation_examples'

RSpec.describe Fixtures::Middleware::SetPassword do
  include ActiveSupport::Testing::TimeHelpers
  include Spec::Support::Examples::OperationExamples

  subject(:middleware) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:next_result)  { Cuprum::Result.new(value: reference) }
    let(:next_command) { instance_double(Cuprum::Command, call: next_result) }
    let(:curried)      { middleware.curry(next_command) }
    let(:password)     { 'tronlives' }
    let(:data) do
      {
        'username'      => 'Alan Bradley',
        'email_address' => 'alan.bradley@example.com',
        'role'          => 'user'
      }
    end
    let(:expected_data) { data.except('password') }

    def call_operation
      curried.call(attributes: data)
    end

    context 'when the returned value is a Hash' do
      let(:next_result) { Cuprum::Result.new(value: expected_data) }

      it 'should call the next command' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the data' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(expected_data)
      end

      context 'when the data includes password: value' do
        let(:data) { super().merge('password' => password) }

        it 'should call the next command' do
          curried.call(attributes: data)

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected_data)
        end

        it 'should return a result with the data' do
          expect(call_operation)
            .to be_a_passing_result
            .with_value(expected_data)
        end
      end
    end

    context 'when the returned value is not persisted' do
      let(:next_result) { Cuprum::Result.new(value: FactoryBot.build(:user)) }

      it 'should call the next command' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the value' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(next_result.value)
      end

      context 'when the data includes password: value' do
        let(:data) { super().merge('password' => password) }

        it 'should call the next command' do
          curried.call(attributes: data)

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected_data)
        end

        it 'should return a result with the value' do
          expect(call_operation)
            .to be_a_passing_result
            .with_value(next_result.value)
        end
      end
    end

    context 'when the returned value is persisted' do
      let(:user)        { FactoryBot.build(:user) }
      let(:next_result) { Cuprum::Result.new(value: user) }

      before(:example) { user.save! }

      it 'should call the next command' do
        curried.call(attributes: data)

        expect(next_command)
          .to have_received(:call)
          .with(attributes: expected_data)
      end

      it 'should return a result with the value' do
        expect(call_operation)
          .to be_a_passing_result
          .with_value(next_result.value)
      end

      context 'when the data includes password: value' do
        let(:data) { super().merge('password' => password) }

        it 'should call the next command' do
          curried.call(attributes: data)

          expect(next_command)
            .to have_received(:call)
            .with(attributes: expected_data)
        end

        it 'should return a result with the value' do
          expect(call_operation)
            .to be_a_passing_result
            .with_value(next_result.value)
        end

        it 'should create a password credential for the user' do
          query = Authentication::PasswordCredential.where(user: user)

          expect { call_operation }.to change(query, :count).by(1)
        end

        it 'should set the expiration date' do
          freeze_time do
            call_operation

            credential =
              Authentication::PasswordCredential.where(user: user).last

            expect(credential.expires_at).to be == 1.year.from_now
          end
        end

        it 'should set the encrypted password' do
          call_operation

          credential = Authentication::PasswordCredential.where(user: user).last
          encrypted  = credential.encrypted_password

          expect(BCrypt::Password.new(encrypted)).to be == password
        end

        # rubocop:disable RSpec/NestedGroups
        context 'when the generated credential is invalid' do
          let(:credential) do
            Authentication::PasswordCredential.new(
              user:       user,
              expires_at: 1.week.from_now
            )
          end
          let(:expected_error) do
            Errors::FailedValidation.new(record: credential)
          end

          before(:example) do
            allow(Authentication::PasswordCredential)
              .to receive(:new)
              .and_return(credential)

            allow(credential).to receive(:save).and_return(false)
          end

          it 'should return a failing result' do
            expect(curried.call(attributes: data))
              .to be_a_failing_result
              .with_error(expected_error)
          end
        end
        # rubocop:enable RSpec/NestedGroups

        # rubocop:disable RSpec/NestedGroups
        context 'when the user has an existing password credential' do
          let(:old_credentials) do
            [
              FactoryBot.build(:password_credential, :active,   user: user),
              FactoryBot.build(:password_credential, :inactive, user: user),
              FactoryBot.build(:password_credential, :inactive, user: user)
            ]
          end

          before(:example) { old_credentials.each(&:save!) }

          it 'should replace the existing password credentials' do
            query = Authentication::PasswordCredential.where(user: user)

            expect { call_operation }.to change(query, :count).to(1)
          end

          it 'should set the expiration date' do
            freeze_time do
              call_operation

              credential =
                Authentication::PasswordCredential.where(user: user).last

              expect(credential.expires_at).to be == 1.year.from_now
            end
          end

          it 'should set the encrypted password' do
            call_operation

            credential =
              Authentication::PasswordCredential.where(user: user).last
            encrypted  = credential.encrypted_password

            expect(BCrypt::Password.new(encrypted)).to be == password
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end
end
