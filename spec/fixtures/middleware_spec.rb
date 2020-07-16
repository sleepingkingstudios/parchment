# frozen_string_literal: true

require 'fixtures/middleware'
require 'fixtures/middleware/base'

RSpec.describe Fixtures::Middleware do
  describe '.apply' do
    let(:command) do
      Cuprum::Command.new { |ary| ary << 'command' }
    end
    let(:middleware) { [] }
    let(:applied_middleware) do
      described_class.apply(command: command, middleware: middleware)
    end

    example_class 'Spec::ExampleMiddleware', Fixtures::Middleware::Base \
    do |klass|
      klass.send :define_method, :process do |cmd, ary|
        ary << ['before', options[:index]].compact.join('_')

        ary = cmd.call(ary).value

        ary << ['after', options[:index]].compact.join('_')
      end

      klass.send :private, :process
    end

    it 'should define the class method' do
      expect(described_class)
        .to respond_to(:apply)
        .with(0).arguments
        .and_keywords(:command, :middleware)
    end

    describe 'with an empty middleware array' do
      let(:expected) { %w[command] }

      it 'should return the command' do
        expect(applied_middleware).to be command
      end

      it 'should call the command' do
        result = applied_middleware.call([])

        expect(result.value).to be == expected
      end
    end

    describe 'with a middleware array with one item' do
      let(:middleware) do
        [
          Spec::ExampleMiddleware.new
        ]
      end
      let(:expected) { %w[before command after] }

      it 'should return a curried command' do
        expect(applied_middleware).to be_a Cuprum::Currying::CurriedCommand
      end

      it 'should call the command and the middleware' do
        result = applied_middleware.call([])

        expect(result.value).to be == expected
      end
    end

    describe 'with a middleware array with many items' do
      let(:middleware) do
        [
          Spec::ExampleMiddleware.new(index: 1),
          Spec::ExampleMiddleware.new(index: 2),
          Spec::ExampleMiddleware.new(index: 3)
        ]
      end
      let(:expected) do
        %w[before_1 before_2 before_3 command after_3 after_2 after_1]
      end

      it 'should return a curried command' do
        expect(applied_middleware).to be_a Cuprum::Currying::CurriedCommand
      end

      it 'should call the command and the middleware' do
        result = applied_middleware.call([])

        expect(result.value).to be == expected
      end
    end
  end
end
