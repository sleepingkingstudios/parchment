# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Authentication::User, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:user) { described_class.new(attributes) }

  let(:attributes) do
    {
      username:      'Alan Bradley',
      email_address: 'alan.bradley@example.com',
      role:          'user'
    }
  end

  include_examples 'should have timestamps'

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::Records::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '::Roles' do
    let(:expected_roles) do
      {
        ADMIN:     'admin',
        ANONYMOUS: 'anonymous',
        USER:      'user'
      }
    end

    include_examples 'should define immutable constant', :Roles

    it 'should enumerate the schools' do
      expect(described_class::Roles.all).to be == expected_roles
    end

    describe '::ADMIN' do
      it 'should store the value' do
        expect(described_class::Roles::ADMIN).to be == 'admin'
      end
    end

    describe '::ANONYMOUS' do
      it 'should store the value' do
        expect(described_class::Roles::ANONYMOUS).to be == 'anonymous'
      end
    end

    describe '::USER' do
      it 'should store the value' do
        expect(described_class::Roles::USER).to be == 'user'
      end
    end
  end

  describe '.anonymous' do
    let(:anonymous_user) { described_class.anonymous }

    it { expect(described_class).to respond_to(:anonymous).with(0).arguments }

    it { expect(anonymous_user).to be_a described_class }

    it { expect(anonymous_user.email_address).to be == '' }

    it 'should have role: anonymous' do
      expect(anonymous_user.role).to be == described_class::Roles::ANONYMOUS
    end

    it { expect(anonymous_user.username).to be == '' }

    it { expect(anonymous_user.persisted?).to be false }

    it 'should generate a new copy each time' do
      anonymous_user.username = 'Ed Dillinger'

      expect(described_class.anonymous.username).to be == ''
    end
  end

  describe '#admin?' do
    include_examples 'should have predicate', :admin?, false

    context 'with role: admin' do
      let(:attributes) { super().merge(role: described_class::Roles::ADMIN) }

      it { expect(user.admin?).to be true }
    end

    context 'with role: anonymous' do
      let(:attributes) do
        super().merge(role: described_class::Roles::ANONYMOUS)
      end

      it { expect(user.admin?).to be false }
    end
  end

  describe '#anonymous?' do
    include_examples 'should have predicate', :anonymous?, false

    context 'with role: admin' do
      let(:attributes) { super().merge(role: described_class::Roles::ADMIN) }

      it { expect(user.anonymous?).to be false }
    end

    context 'with role: anonymous' do
      let(:attributes) do
        super().merge(role: described_class::Roles::ANONYMOUS)
      end

      it { expect(user.anonymous?).to be true }
    end
  end

  describe '#credentials' do
    include_examples 'should have reader', :credentials, []

    context 'when the user has many credentials' do
      let(:credentials) do
        Array.new(3) do
          FactoryBot.build(:password_credential, user: user)
        end
      end

      before(:example) { credentials.each(&:save!) }

      it { expect(user.credentials).to contain_exactly(*credentials) }
    end
  end

  describe '#email_address' do
    include_examples 'should have attribute', :email_address, default: ''
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the user is persisted' do
      before(:example) { user.save! }

      it { expect(user.id).to be_a_uuid }
    end
  end

  describe '#role' do
    include_examples 'should have attribute', :role, default: ''
  end

  describe '#username' do
    include_examples 'should have attribute', :username, default: ''
  end

  describe '#valid?' do
    it { expect(user).not_to have_errors }

    include_examples 'should validate the presence of',
      :email_address,
      type: String

    include_examples 'should validate the uniqueness of',
      :email_address,
      attributes: {
        role:     described_class::Roles::USER,
        username: 'Ed Dillinger'
      }

    include_examples 'should validate the presence of', :role, type: String

    include_examples 'should validate the presence of', :username, type: String

    include_examples 'should validate the uniqueness of',
      :username,
      attributes: {
        email_address: 'ed.dillinger@example.com',
        role:          described_class::Roles::USER
      }

    context 'when the email address is malformed' do
      let(:attributes) { super().merge(email_address: 'foo') }

      it 'should have an error' do
        expect(user)
          .to have_errors
          .on(:email_address)
          .with_message('is invalid')
      end
    end

    context 'when the role is admin' do
      let(:attributes) { super().merge(role: described_class::Roles::ADMIN) }

      it { expect(user).not_to have_errors }
    end

    context 'when the role is anonymous' do
      let(:attributes) do
        super().merge(role: described_class::Roles::ANONYMOUS)
      end

      it 'should have an error' do
        expect(user)
          .to have_errors
          .on(:role)
          .with_message('is not included in the list')
      end
    end

    context 'when the role is invalid' do
      let(:attributes) do
        super().merge(role: 'invalid')
      end

      it 'should have an error' do
        expect(user)
          .to have_errors
          .on(:role)
          .with_message('is not included in the list')
      end
    end

    context 'when the username is an email address' do
      let(:attributes) { super().merge(username: 'alan.bradley@example.com') }

      it 'should have an error' do
        expect(user)
          .to have_errors
          .on(:username)
          .with_message("can't be an email address")
      end
    end

    context 'when the username resembles an email address' do
      let(:attributes) { super().merge(username: 'seti@home') }

      it { expect(user).to be_valid }
    end
  end
end
