# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/middleware/builder'
require 'operations/middleware'

RSpec.describe Fixtures::Middleware::Builder do
  subject(:builder) { described_class.new }

  describe '.new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#build' do
    shared_examples 'should build the middleware' do
      it 'should build the middleware' do
        expect(builder.build(name, **options))
          .to be_a Fixtures::Middleware::Custom
      end

      it { expect(builder.build(name, options).options).to be == options }

      context 'when the options are defined' do
        let(:options) { { key: 'value' } }

        it { expect(builder.build(name, options).options).to be == options }
      end
    end

    let(:name)    { '' }
    let(:options) { {} }

    example_class 'Fixtures::Middleware::Custom', Operations::Middleware

    it 'should define the method' do
      expect(builder).to respond_to(:build).with(1).argument.and_any_keywords
    end

    describe 'with nil' do
      it 'should raise an error' do
        expect { builder.build(nil) }
          .to raise_error ArgumentError, "name can't be blank"
      end
    end

    describe 'with an Object' do
      it 'should raise an error' do
        expect { builder.build(Object.new.freeze) }
          .to raise_error ArgumentError, 'name must be a String or Symbol'
      end
    end

    describe 'with an empty string' do
      it 'should raise an error' do
        expect { builder.build('') }
          .to raise_error ArgumentError, "name can't be blank"
      end
    end

    describe 'with a middleware name' do
      context 'when the middleware is not defined' do
        let(:name) { :undefined }

        it 'should raise an error' do
          expect { builder.build(name, **options) }
            .to raise_error(
              NameError,
              'uninitialized constant Fixtures::Middleware::Undefined'
            )
        end
      end

      context 'when the middleware is defined' do
        let(:name) { :custom }

        include_examples 'should build the middleware'
      end
    end

    describe 'with a qualified name' do
      context 'when the middleware is not defined' do
        let(:name) { 'Fixtures::Middleware::Undefined' }

        it 'should raise an error' do
          expect { builder.build(name, **options) }
            .to raise_error(
              NameError,
              'uninitialized constant Fixtures::Middleware::Undefined'
            )
        end
      end

      context 'when the middleware is defined' do
        let(:name) { 'Fixtures::Middleware::Custom' }

        include_examples 'should build the middleware'
      end
    end
  end
end
