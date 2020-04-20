# frozen_string_literal: true

require 'rails_helper'

require 'operations/authentication/extract_header'

RSpec.describe Operations::Authentication::ExtractHeader do
  subject(:operation) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    it { expect(operation).to respond_to(:call).with(1).argument }

    describe 'with nil' do
      let(:expected_error) { Errors::InvalidHeaders.new }

      it 'should return a failing result' do
        expect(operation.call nil)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an Object' do
      let(:expected_error) { Errors::InvalidHeaders.new }

      it 'should return a failing result' do
        expect(operation.call Object.new.freeze)
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty Hash' do
      let(:expected_error) { Errors::Authentication::MissingToken.new }

      it 'should return a failing result' do
        expect(operation.call({}))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with a Hash without an HTTP_AUTHORIZATION key' do
      let(:expected_error) { Errors::Authentication::MissingToken.new }

      it 'should return a failing result' do
        expect(operation.call('ACCEPT' => 'application/json'))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: an empty string' do
      let(:expected_error) { Errors::Authentication::MissingToken.new }

      it 'should return a failing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => ''))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: a malformed string' do
      let(:header) { 'password' }
      let(:expected_error) do
        Errors::Authentication::InvalidHeader.new(header: header)
      end

      it 'should return a failing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => header))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: an invalid scheme' do
      let(:header) { 'Basic YWxhbi5icmFkbGV5QGV4YW1wbGUuY29tOnRyb25saXZlcw==' }
      let(:expected_error) do
        Errors::Authentication::InvalidHeader.new(header: header)
      end

      it 'should return a failing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => header))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: Bearer and a missing token' do
      let(:header) { 'Bearer' }
      let(:expected_error) do
        Errors::Authentication::InvalidHeader.new(header: header)
      end

      it 'should return a failing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => header))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: Bearer and extraneous data' do
      let(:header) { 'Bearer a.b.c INVALID' }
      let(:expected_error) do
        Errors::Authentication::InvalidHeader.new(header: header)
      end

      it 'should return a failing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => header))
          .to have_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with HTTP_AUTHORIZATION: BEARER and a token' do
      let(:token)  { 'a.b.c' }
      let(:header) { "BEARER #{token}" }

      it 'should return a passing result' do
        expect(operation.call('HTTP_AUTHORIZATION' => header))
          .to have_passing_result
          .with_value(token)
      end
    end
  end
end
