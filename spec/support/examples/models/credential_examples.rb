# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'
require 'support/examples/model_examples'
require 'support/examples/models/validation_examples'

module Spec::Support::Examples::Models
  module CredentialExamples
    extend  RSpec::SleepingKingStudios::Concerns::SharedExampleGroup
    include Spec::Support::Examples::ModelExamples

    shared_context 'when the credential belongs to a user' do
      let(:user) { FactoryBot.create(:user) }

      before(:example) { credential.user = user }
    end

    shared_examples 'should implement the credential methods' do
      describe '#active' do
        include_examples 'should have attribute', :active, default: true
      end

      describe '#active?' do
        include_examples 'should have predicate', :active?, true

        context 'when the credential is inactive' do
          let(:attributes) { super().merge(active: false) }

          it { expect(credential.active?).to be false }
        end
      end

      describe '#data' do
        include_examples 'should have attribute', :data, default: {}
      end

      describe '#expires_at' do
        include_examples 'should have attribute', :expires_at, default: nil
      end

      describe '#expired?' do
        include_examples 'should have predicate', :expired?, false

        context 'when expires_at is nil' do
          let(:attributes) { super().merge(expires_at: nil) }

          it { expect(credential.expired?).to be true }
        end

        context 'when expires_at is in the past' do
          let(:attributes) { super().merge(expires_at: 1.second.ago) }

          it { expect(credential.expired?).to be true }
        end
      end

      describe '#type' do
        include_examples 'should have reader', :type
      end

      describe '#user' do
        include_examples 'should have property', :user, nil

        wrap_context 'when the credential belongs to a user' do
          it { expect(credential.user).to be == user }
        end
      end

      describe '#user_id' do
        include_examples 'should have property', :user_id, nil

        wrap_context 'when the credential belongs to a user' do
          it { expect(credential.user_id).to be == user.id }
        end
      end

      describe '#valid?' do
        include_examples 'should validate the presence of', :active

        include_examples 'should validate the presence of', :expires_at

        include_examples 'should validate the presence of', :type, type: String
      end
    end
  end
end
