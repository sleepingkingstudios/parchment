# frozen_string_literal: true

require 'rails_helper'

require 'serializers/authentication/user_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::Authentication::UserSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:user) { FactoryBot.build(:user).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { user }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :email_address,
      :role,
      :username
  end
end
