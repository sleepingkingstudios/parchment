# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/password/encrypt'

RSpec.describe Operations::Authentication::Password::Encrypt do
  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:expected_error) { Errors::Authentication::InvalidPassword.new }

    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      it 'should return a failing result' do
        expect(operation.call nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      it 'should return a failing result' do
        expect(operation.call Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty String' do
      it 'should return a failing result' do
        expect(operation.call '')
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a String' do
      let(:password) { 'password' }

      it 'should return a passing result' do
        expect(operation.call password).to have_passing_result
      end

      it 'should return the encrypted password', :aggregate_failures do
        encrypted = operation.call(password).value

        expect(encrypted).to be_a String
        expect(BCrypt::Password.new(encrypted)).to be == password
      end
    end
  end
end
