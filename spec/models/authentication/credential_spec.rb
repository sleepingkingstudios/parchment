# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/credential_examples'

RSpec.describe Authentication::Credential, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::CredentialExamples

  shared_context 'when there are many credentials' do
    let(:user) { FactoryBot.build(:user) }
    let(:credentials) do
      [
        Spec::Credential.new(
          user:       user,
          active:     true,
          expires_at: 1.day.from_now
        ),
        Spec::Credential.new(
          user:       user,
          active:     true,
          expires_at: 1.day.ago
        ),
        Spec::Credential.new(
          user:       user,
          active:     false,
          expires_at: 1.day.from_now
        ),
        Spec::Credential.new(
          user:       user,
          active:     false,
          expires_at: 1.day.ago
        )
      ]
    end

    example_class 'Spec::Credential', Authentication::Credential

    before(:example) do
      user.save!

      credentials.each(&:save!)
    end
  end

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

  describe '.active' do
    it { expect(described_class).to respond_to(:active).with(0).arguments }

    it { expect(described_class.active).to be_a ActiveRecord::Relation }

    it { expect(described_class.active).to be == [] }

    wrap_context 'when there are many credentials' do
      let(:expected) { credentials.select(&:active?) }

      it { expect(described_class.active).to contain_exactly(*expected) }
    end
  end

  describe '.expired' do
    it { expect(described_class).to respond_to(:expired).with(0).arguments }

    it { expect(described_class.expired).to be_a ActiveRecord::Relation }

    it { expect(described_class.expired).to be == [] }

    wrap_context 'when there are many credentials' do
      let(:expected) { credentials.select(&:expired?) }

      it { expect(described_class.expired).to contain_exactly(*expected) }
    end
  end

  describe '.inactive' do
    it { expect(described_class).to respond_to(:inactive).with(0).arguments }

    it { expect(described_class.inactive).to be_a ActiveRecord::Relation }

    it { expect(described_class.inactive).to be == [] }

    wrap_context 'when there are many credentials' do
      let(:expected) { credentials.reject(&:active?) }

      it { expect(described_class.inactive).to contain_exactly(*expected) }
    end
  end

  describe '.unexpired' do
    it { expect(described_class).to respond_to(:unexpired).with(0).arguments }

    it { expect(described_class.unexpired).to be_a ActiveRecord::Relation }

    it { expect(described_class.unexpired).to be == [] }

    wrap_context 'when there are many credentials' do
      let(:expected) { credentials.reject(&:expired?) }

      it { expect(described_class.unexpired).to contain_exactly(*expected) }
    end
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'
  end

  describe '#type' do
    it { expect(credential.type).to be nil }
  end
end
