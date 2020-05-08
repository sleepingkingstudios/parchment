# frozen_string_literal: true

require 'rails_helper'

require 'errors/authentication/user_not_found'

RSpec.describe Errors::Authentication::UserNotFound do
  subject(:error) { described_class.new(username: username) }

  let(:username) { 'Alan Bradley' }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'authentication.user_not_found'
  end

  describe '.new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:username)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => { 'username' => username },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#message' do
    include_examples 'should have reader',
      :message,
      -> { "User not found with username #{username.inspect}" }
  end

  describe '#type' do
    include_examples 'should have reader',
      :type,
      'authentication.user_not_found'
  end

  describe '#username' do
    include_examples 'should have reader', :username, -> { username }
  end
end
