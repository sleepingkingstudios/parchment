# frozen_string_literal: true

require 'operations/applied_middleware'
require 'operations/middleware'

RSpec.describe Operations::AppliedMiddleware do
  shared_context 'when the command definition has params' do
    let(:command_class) { Spec::ExampleCommandWithParams }
  end

  shared_context 'when the command definition is a Class' do
    let(:command_class) { Spec::ExampleCommand }
  end

  shared_context 'when the command definition is a Class name' do
    let(:command_class)      { Spec::ExampleCommand }
    let(:command_definition) { command_class.name }
  end

  shared_context 'when the command definition is a Proc' do
    include_context 'when the command definition has params'

    let(:middleware_class) { Spec::ExampleMiddleware }
    let(:command_definition) do
      lambda do |*args, **kwargs|
        if kwargs.empty?
          Spec::ExampleCommandWithParams.new(*args)
        else
          Spec::ExampleCommandWithParams.new(*args, **kwargs)
        end
      end
    end
  end

  shared_context 'when the middleware definitions have one Class' do
    let(:middleware_class)       { Spec::ExampleMiddleware }
    let(:middleware_definitions) { Array.new(1, Spec::ExampleMiddleware) }
  end

  shared_context 'when the middleware definitions have one Proc' do
    let(:middleware_class) { Spec::ExampleMiddleware }
    let(:middleware_definitions) do
      Array.new(1) do
        lambda do |*args, **kwargs|
          if kwargs.empty?
            middleware_class.new(*args)
          else
            middleware_class.new(*args, **kwargs)
          end
        end
      end
    end
  end

  shared_context 'when the middleware definitions have many Classes' do
    let(:middleware_class)       { Spec::ExampleMiddleware }
    let(:middleware_definitions) { Array.new(3, Spec::ExampleMiddleware) }
  end

  shared_context 'when the middleware definitions have many Procs' do
    let(:middleware_class) { Spec::ExampleMiddleware }
    let(:middleware_definitions) do
      Array.new(3) do
        lambda do |*args, **kwargs|
          if kwargs.empty?
            middleware_class.new(*args)
          else
            middleware_class.new(*args, **kwargs)
          end
        end
      end
    end
  end

  shared_context 'when the middleware has a label' do
    example_class 'Spec::LabeledMiddleware', Operations::Middleware do |klass|
      klass.define_singleton_method(:subclass) do |label|
        subclass_label = label

        Class.new(self) do |subclass|
          subclass.define_method(:label) { subclass_label }
        end
      end

      klass.define_method(:process) do |next_command, ary|
        ary << "before_#{label}"

        super(next_command, ary)

        ary << "after_#{label}"
      end
    end
  end

  shared_context 'with a custom subclass' do
    subject(:applied_middleware) do
      described_class.new(*constructor_args, **constructor_kwargs)
    end

    let(:described_class) { Spec::CustomAppliedMiddleware }

    example_constant 'Spec::CustomAppliedMiddleware' do
      Operations::AppliedMiddleware # rubocop:disable RSpec/DescribedClass
        .subclass(command_definition, middleware_definitions)
    end
  end

  shared_examples 'should validate the command' do
    describe 'with command: nil' do
      let(:command_definition) { nil }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with command: an Object' do
      let(:command_definition) { Object.new.freeze }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with command: a non-command Class' do
      let(:command_definition) { Class.new }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with command: an empty String' do
      let(:command_definition) { '' }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with command: an invalid String' do
      let(:command_definition) { 'not a class' }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with command: the name of a non-command Class' do
      let(:command_definition) { 'String' }
      let(:error_message) do
        'command must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end
  end

  shared_examples 'should validate the middleware' do
    describe 'with middleware: nil' do
      let(:middleware_definitions) { nil }
      let(:error_message) do
        'middleware must be an Array'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware: an Object' do
      let(:middleware_definitions) { Object.new.freeze }
      let(:error_message) do
        'middleware must be an Array'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: nil' do
      let(:middleware_definitions) { [nil] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: an Object' do
      let(:middleware_definitions) { [Object.new.freeze] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: a non-command Class' do
      let(:middleware_definitions) { [Class.new] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: an empty String' do
      let(:middleware_definitions) { [''] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: an invalid String' do
      let(:middleware_definitions) { ['not a class'] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end

    describe 'with middleware item: the name of a non-command Class' do
      let(:middleware_definitions) { %w[String] }
      let(:error_message) do
        'middleware item must be a command Class, a Class name, or a Proc'
      end

      it 'should raise an exception' do
        expect { build_command }.to raise_error ArgumentError, error_message
      end
    end
  end

  subject(:applied_middleware) do
    described_class.new(
      command_definition,
      middleware_definitions,
      *constructor_args,
      **constructor_kwargs
    )
  end

  let(:command_class)          { Class.new(Cuprum::Command) }
  let(:command_definition)     { command_class }
  let(:middleware_class)       { Class.new(Operations::Middleware) }
  let(:middleware_definitions) { [] }
  let(:constructor_args)       { [] }
  let(:constructor_kwargs)     { {} }

  example_class 'Spec::ExampleCommand', Cuprum::Command do |klass|
    klass.define_method(:process) do |ary = []|
      ary << 'root'
    end
  end

  example_class 'Spec::ExampleCommandWithParams', 'Spec::ExampleCommand' \
  do |klass|
    klass.define_method(:initialize) do |*args, **kwargs|
      @arguments = args
      @keywords  = kwargs
    end

    klass.send :attr_reader, :arguments, :keywords
  end

  example_class 'Spec::ExampleMiddleware', Operations::Middleware do |klass|
    klass.define_method(:initialize) do |*args, **kwargs|
      @arguments = args
      @keywords  = kwargs
    end

    klass.send :attr_reader, :arguments, :keywords
  end

  describe '.new' do
    def build_command
      described_class.new(
        command_definition,
        middleware_definitions,
        *constructor_args,
        **constructor_kwargs
      )
    end

    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(2).arguments
        .and_unlimited_arguments
        .and_any_keywords
    end

    include_examples 'should validate the command'

    include_examples 'should validate the middleware'
  end

  describe '.command' do
    include_examples 'should define class reader', :command, nil

    wrap_context 'with a custom subclass' do
      it { expect(described_class.command).to be command_definition }

      wrap_context 'when the command definition is a Class' do
        it { expect(described_class.command).to be command_definition }
      end

      wrap_context 'when the command definition is a Class name' do
        it { expect(described_class.command).to be command_definition }
      end

      wrap_context 'when the command definition is a Proc' do
        it { expect(described_class.command).to be command_definition }
      end
    end
  end

  describe '.middleware' do
    include_examples 'should define class reader', :middleware, nil

    wrap_context 'with a custom subclass' do
      it { expect(described_class.middleware).to be == middleware_definitions }

      wrap_context 'when the middleware definitions have one Class' do
        it 'should return the middleware definitions' do
          expect(described_class.middleware).to be == middleware_definitions
        end
      end

      wrap_context 'when the middleware definitions have one Proc' do
        it 'should return the middleware definitions' do
          expect(described_class.middleware).to be == middleware_definitions
        end
      end

      wrap_context 'when the middleware definitions have many Classes' do
        it 'should return the middleware definitions' do
          expect(described_class.middleware).to be == middleware_definitions
        end
      end

      wrap_context 'when the middleware definitions have many Procs' do
        it 'should return the middleware definitions' do
          expect(described_class.middleware).to be == middleware_definitions
        end
      end
    end
  end

  describe '.subclass' do
    include_context 'when the command definition is a Class'
    include_context 'when the middleware definitions have many Classes'
    include_context 'when the middleware has a label'

    subject(:applied_middleware) do
      build_command.new(*constructor_args, **constructor_kwargs)
    end

    def build_command
      described_class.subclass(
        command_definition,
        middleware_definitions
      )
    end

    it { expect(described_class).to respond_to(:subclass).with(2).arguments }

    include_examples 'should validate the command'

    include_examples 'should validate the middleware'

    it { expect(build_command).to be_a Class }

    it { expect(build_command).to be < described_class }

    it { expect(build_command.command).to be command_definition }

    it { expect(build_command.middleware).to be == middleware_definitions }

    it { expect(applied_middleware.command).to be_a command_class }

    it { expect(applied_middleware.middleware).to be_a Array }

    it 'should set the middleware' do
      expect(applied_middleware.middleware.size)
        .to be == middleware_definitions.size
    end

    describe 'with command: a subclass of AppliedMiddleware' do
      let(:parent_command) { Spec::ExampleCommand }
      let(:parent_middleware) do
        %w[fourth fifth sixth].map do |label|
          Spec::LabeledMiddleware.subclass(label)
        end
      end
      let(:command_definition) do
        described_class.subclass(parent_command, parent_middleware)
      end
      let(:expected_middleware) do
        middleware_definitions + parent_middleware
      end

      it { expect(build_command.command).to be parent_command }

      it { expect(build_command.middleware).to be == expected_middleware }

      it { expect(applied_middleware.command).to be_a parent_command }

      it 'should set the middleware' do
        expect(applied_middleware.middleware.size)
          .to be == expected_middleware.size
      end
    end
  end

  describe '#applied' do
    include_examples 'should have private reader', :applied

    it { expect(applied_middleware.send :applied).to be_a Cuprum::Command }
  end

  describe '#call' do
    include_context 'when the command definition is a Class'

    let(:expected) { %w[root] }

    it 'should define the method' do
      expect(applied_middleware)
        .to respond_to(:call)
        .with_unlimited_arguments
        .and_any_keywords
    end

    it 'should call the root command' do
      expect(applied_middleware.call([]))
        .to be_a_passing_result
        .with_value(expected)
    end

    context 'when there is one middleware command' do
      include_context 'when the middleware has a label'

      let(:middleware_definitions) do
        %w[middleware].map do |label|
          -> { Spec::LabeledMiddleware.subclass(label).new }
        end
      end
      let(:expected) { %w[before_middleware root after_middleware] }

      it 'should call the root command and the middleware' do
        expect(applied_middleware.call([]))
          .to be_a_passing_result
          .with_value(expected)
      end
    end

    context 'when there are many middleware commands' do
      include_context 'when the middleware has a label'

      let(:middleware_definitions) do
        %w[first second third].map do |label|
          -> { Spec::LabeledMiddleware.subclass(label).new }
        end
      end
      let(:expected) do
        %w[
          before_first
          before_second
          before_third
          root
          after_third
          after_second
          after_first
        ]
      end

      it 'should call the root command and the middleware' do
        expect(applied_middleware.call([]))
          .to be_a_passing_result
          .with_value(expected)
      end
    end
  end

  describe '#command' do
    include_examples 'should have reader', :command

    wrap_context 'when the command definition is a Class' do
      it { expect(applied_middleware.command).to be_a command_class }
    end

    wrap_context 'when the command definition is a Class name' do
      it { expect(applied_middleware.command).to be_a command_class }
    end

    wrap_context 'when the command definition is a Class name' do
      it { expect(applied_middleware.command).to be_a command_class }
    end

    wrap_context 'when the command definition is a Proc' do
      it { expect(applied_middleware.command).to be_a command_class }

      it { expect(applied_middleware.command.arguments).to be == [] }

      it { expect(applied_middleware.command.keywords).to be == {} }

      context 'when initialized with arguments and keywords' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.command.arguments)
            .to be == constructor_args
        end

        it { expect(applied_middleware.command.keywords).to be == {} }
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.command.arguments)
            .to be == constructor_args
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.command.keywords)
            .to be == constructor_kwargs
        end
      end
    end

    wrap_context 'when the command definition has params' do
      it { expect(applied_middleware.command).to be_a command_class }

      it { expect(applied_middleware.command.arguments).to be == [] }

      it { expect(applied_middleware.command.keywords).to be == {} }

      context 'when initialized with arguments and keywords' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.command.arguments)
            .to be == constructor_args
        end

        it { expect(applied_middleware.command.keywords).to be == {} }
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.command.arguments)
            .to be == constructor_args
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.command.keywords)
            .to be == constructor_kwargs
        end
      end
    end

    wrap_context 'with a custom subclass' do
      wrap_context 'when the command definition is a Class' do
        it { expect(applied_middleware.command).to be_a command_class }
      end

      wrap_context 'when the command definition is a Class name' do
        it { expect(applied_middleware.command).to be_a command_class }
      end

      wrap_context 'when the command definition is a Class name' do
        it { expect(applied_middleware.command).to be_a command_class }
      end

      wrap_context 'when the command definition is a Proc' do
        it { expect(applied_middleware.command).to be_a command_class }

        it { expect(applied_middleware.command.arguments).to be == [] }

        it { expect(applied_middleware.command.keywords).to be == {} }

        context 'when initialized with arguments and keywords' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.command.arguments)
              .to be == constructor_args
          end

          it { expect(applied_middleware.command.keywords).to be == {} }
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.command.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.command.keywords)
              .to be == constructor_kwargs
          end
        end
      end

      wrap_context 'when the command definition has params' do
        it { expect(applied_middleware.command).to be_a command_class }

        it { expect(applied_middleware.command.arguments).to be == [] }

        it { expect(applied_middleware.command.keywords).to be == {} }

        context 'when initialized with arguments and keywords' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.command.arguments)
              .to be == constructor_args
          end

          it { expect(applied_middleware.command.keywords).to be == {} }
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.command.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.command.keywords)
              .to be == constructor_kwargs
          end
        end
      end
    end
  end

  describe '#middleware' do
    include_examples 'should have reader', :middleware, []

    it { expect(applied_middleware.middleware).to be_frozen }

    wrap_context 'when the middleware definitions have one Class' do
      include_context 'when the command definition has params'

      it { expect(applied_middleware.middleware.size).to be 1 }

      it 'should build the middleware' do
        expect(applied_middleware.middleware.first).to be_a middleware_class
      end

      it { expect(applied_middleware.middleware.first.arguments).to be == [] }

      it { expect(applied_middleware.middleware.first.keywords).to be == {} }

      context 'when initialized with arguments' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.first.arguments)
            .to be == constructor_args
        end

        it { expect(applied_middleware.middleware.first.keywords).to be == {} }
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.first.arguments)
            .to be == constructor_args
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.middleware.first.keywords)
            .to be == constructor_kwargs
        end
      end
    end

    wrap_context 'when the middleware definitions have one Proc' do
      include_context 'when the command definition has params'

      it { expect(applied_middleware.middleware.size).to be 1 }

      it 'should build the middleware' do
        expect(applied_middleware.middleware.first).to be_a middleware_class
      end

      it { expect(applied_middleware.middleware.first.arguments).to be == [] }

      it { expect(applied_middleware.middleware.first.keywords).to be == {} }

      context 'when initialized with arguments' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.first.arguments)
            .to be == constructor_args
        end

        it { expect(applied_middleware.middleware.first.keywords).to be == {} }
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.first.arguments)
            .to be == constructor_args
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.middleware.first.keywords)
            .to be == constructor_kwargs
        end
      end
    end

    wrap_context 'when the middleware definitions have many Classes' do
      include_context 'when the command definition has params'

      it { expect(applied_middleware.middleware.size).to be 3 }

      it 'should build the middleware' do
        expect(applied_middleware.middleware).to all(be_a middleware_class)
      end

      it 'should initialize the middleware with no arguments' do
        expect(applied_middleware.middleware.map(&:arguments)).to all(be == [])
      end

      it 'should initialize the middleware with no keywords' do
        expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
      end

      context 'when initialized with arguments' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.map(&:arguments))
            .to all(be == constructor_args)
        end

        it 'should initialize the middleware with no keywords' do
          expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
        end
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.map(&:arguments))
            .to all(be == constructor_args)
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.middleware.map(&:keywords))
            .to all(be == constructor_kwargs)
        end
      end
    end

    wrap_context 'when the middleware definitions have many Procs' do
      include_context 'when the command definition has params'

      it { expect(applied_middleware.middleware.size).to be 3 }

      it 'should build the middleware' do
        expect(applied_middleware.middleware).to all(be_a middleware_class)
      end

      it 'should initialize the middleware with no arguments' do
        expect(applied_middleware.middleware.map(&:arguments)).to all(be == [])
      end

      it 'should initialize the middleware with no keywords' do
        expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
      end

      context 'when initialized with arguments' do
        let(:constructor_args) { %i[foo bar baz] }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.map(&:arguments))
            .to all(be == constructor_args)
        end

        it 'should initialize the middleware with no keywords' do
          expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
        end
      end

      context 'when initialized with arguments and keywords' do
        let(:constructor_args)   { %i[foo bar baz] }
        let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

        it 'should pass the constructor arguments' do
          expect(applied_middleware.middleware.map(&:arguments))
            .to all(be == constructor_args)
        end

        it 'should pass the constructor keywords' do
          expect(applied_middleware.middleware.map(&:keywords))
            .to all(be == constructor_kwargs)
        end
      end
    end

    wrap_context 'with a custom subclass' do
      wrap_context 'when the middleware definitions have one Class' do
        include_context 'when the command definition has params'

        it { expect(applied_middleware.middleware.size).to be 1 }

        it 'should build the middleware' do
          expect(applied_middleware.middleware.first).to be_a middleware_class
        end

        it { expect(applied_middleware.middleware.first.arguments).to be == [] }

        it { expect(applied_middleware.middleware.first.keywords).to be == {} }

        context 'when initialized with arguments' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.first.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.first.keywords).to be == {}
          end
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.first.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.first.keywords)
              .to be == constructor_kwargs
          end
        end
      end

      wrap_context 'when the middleware definitions have one Proc' do
        include_context 'when the command definition has params'

        it { expect(applied_middleware.middleware.size).to be 1 }

        it 'should build the middleware' do
          expect(applied_middleware.middleware.first).to be_a middleware_class
        end

        it { expect(applied_middleware.middleware.first.arguments).to be == [] }

        it { expect(applied_middleware.middleware.first.keywords).to be == {} }

        context 'when initialized with arguments' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.first.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.first.keywords).to be == {}
          end
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.first.arguments)
              .to be == constructor_args
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.first.keywords)
              .to be == constructor_kwargs
          end
        end
      end

      wrap_context 'when the middleware definitions have many Classes' do
        include_context 'when the command definition has params'

        it { expect(applied_middleware.middleware.size).to be 3 }

        it 'should build the middleware' do
          expect(applied_middleware.middleware).to all(be_a middleware_class)
        end

        it 'should initialize the middleware with no arguments' do
          expect(applied_middleware.middleware
              .map(&:arguments)).to all(be == [])
        end

        it 'should initialize the middleware with no keywords' do
          expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
        end

        context 'when initialized with arguments' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.map(&:arguments))
              .to all(be == constructor_args)
          end

          it 'should initialize the middleware with no keywords' do
            expect(applied_middleware.middleware.map(&:keywords))
              .to all(be == {})
          end
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.map(&:arguments))
              .to all(be == constructor_args)
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.map(&:keywords))
              .to all(be == constructor_kwargs)
          end
        end
      end

      wrap_context 'when the middleware definitions have many Procs' do
        include_context 'when the command definition has params'

        it { expect(applied_middleware.middleware.size).to be 3 }

        it 'should build the middleware' do
          expect(applied_middleware.middleware).to all(be_a middleware_class)
        end

        it 'should initialize the middleware with no arguments' do
          expect(applied_middleware.middleware.map(&:arguments))
            .to all(be == [])
        end

        it 'should initialize the middleware with no keywords' do
          expect(applied_middleware.middleware.map(&:keywords)).to all(be == {})
        end

        context 'when initialized with arguments' do
          let(:constructor_args) { %i[foo bar baz] }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.map(&:arguments))
              .to all(be == constructor_args)
          end

          it 'should initialize the middleware with no keywords' do
            expect(applied_middleware.middleware.map(&:keywords))
              .to all(be == {})
          end
        end

        context 'when initialized with arguments and keywords' do
          let(:constructor_args)   { %i[foo bar baz] }
          let(:constructor_kwargs) { { ichi: 1, ni: 2, san: 3 } }

          it 'should pass the constructor arguments' do
            expect(applied_middleware.middleware.map(&:arguments))
              .to all(be == constructor_args)
          end

          it 'should pass the constructor keywords' do
            expect(applied_middleware.middleware.map(&:keywords))
              .to all(be == constructor_kwargs)
          end
        end
      end
    end
  end
end
