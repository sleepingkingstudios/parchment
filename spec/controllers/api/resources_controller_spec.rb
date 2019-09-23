# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/factory'

require 'support/model'

RSpec.describe Api::ResourcesController do
  subject(:controller) { described_class.new }

  shared_context 'with a controller subclass' do
    let(:described_class) { Spec::WidgetsController }

    example_class 'Spec::Widget', Spec::Support::Model do |klass|
      klass.const_set(:Factory, Operations::Records::Factory.new(klass))

      klass.attr_accessor :name
    end

    # rubocop:disable RSpec/DescribedClass
    example_class 'Spec::WidgetsController', Api::ResourcesController do |klass|
      klass.define_method(:resource_class) { Spec::Widget }
    end
    # rubocop:enable RSpec/DescribedClass
  end

  shared_context 'with a params hash' do
    let(:params) { {} }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:params)
        .and_return(ActionController::Parameters.new(params))
    end
  end

  describe '#create' do
    let(:responder) { controller.send(:responder) }
    let(:result)    { Cuprum::Result.new }
    let(:options)   { { action: :create, status: :created } }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:create_resource)
        .and_return(result)

      allow(responder).to receive(:call)
    end

    it { expect(controller).to respond_to(:create).with(0).arguments }

    it 'should delegate to #create_resource' do
      controller.create

      expect(controller).to have_received(:create_resource)
    end

    it 'should respond with the result' do
      controller.create

      expect(responder).to have_received(:call).with(result, options)
    end
  end

  describe '#create_resource' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:create_resource, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:create_operation)  { instance_double(Cuprum::Operation) }
      let(:resource_params)   { { name: 'Self-sealing Stem Bolt' } }

      before(:example) do
        allow(Spec::Widget::Factory)
          .to receive(:create)
          .and_return(create_operation)

        allow(controller) # rubocop:disable RSpec/SubjectStub
          .to receive(:require_resource_params)
          .and_return(resource_params)
      end

      context 'when the resource params are missing' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(controller) # rubocop:disable RSpec/SubjectStub
            .to receive(:require_resource_params)
            .and_return(result)
        end

        it 'should return the failing result' do
          expect(controller.send :create_resource).to be result
        end
      end

      context 'when the create operation returns a failing result' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(create_operation).to receive(:call).and_return(result)
        end

        it 'should call the create operation' do
          controller.send :create_resource

          expect(create_operation).to have_received(:call).with(resource_params)
        end

        it 'should return the failing result' do
          expect(controller.send :create_resource).to be result
        end
      end

      context 'when the create operation returns a passing result' do
        let(:widget) { Spec::Widget.new(resource_params) }
        let(:result) { Cuprum::Result.new(value: widget) }

        before(:example) do
          allow(create_operation).to receive(:call).and_return(result)
        end

        it 'should call the create operation' do
          controller.send :create_resource

          expect(create_operation).to have_received(:call).with(resource_params)
        end

        it 'should return a passing result' do
          expect(controller.send :create_resource)
            .to be_a_passing_result
            .with_value('widget' => widget)
        end
      end
    end
  end

  describe '#default_order' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:default_order, true)
        .with(0).arguments
    end

    it { expect(controller.send :default_order).to be == {} }
  end

  describe '#destroy' do
    let(:responder) { controller.send(:responder) }
    let(:result)    { Cuprum::Result.new }
    let(:options)   { { action: :destroy } }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:destroy_resource)
        .and_return(result)

      allow(responder).to receive(:call)
    end

    it { expect(controller).to respond_to(:destroy).with(0).arguments }

    it 'should delegate to #destroy_resource' do
      controller.destroy

      expect(controller).to have_received(:destroy_resource)
    end

    it 'should respond with the result' do
      controller.destroy

      expect(responder).to have_received(:call).with(result, options)
    end
  end

  describe '#destroy_resource' do
    include_context 'with a params hash'

    let(:resource_id) { '00000000-0000-0000-0000-000000000000' }
    let(:params)      { { id: resource_id } }

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:create_resource, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:find_operation)    { instance_double(Cuprum::Operation) }
      let(:destroy_operation) { instance_double(Cuprum::Operation) }

      before(:example) do
        allow(Spec::Widget::Factory)
          .to receive(:destroy)
          .and_return(destroy_operation)

        allow(Spec::Widget::Factory)
          .to receive(:find_one)
          .and_return(find_operation)
      end

      context 'when the find operation returns a failing result' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :destroy_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should return the failing result' do
          expect(controller.send :destroy_resource).to be result
        end
      end

      context 'when the destroy operation returns a failing result' do
        let(:widget)         { Spec::Widget.new }
        let(:find_result)    { Cuprum::Result.new(value: widget) }
        let(:error) do
          Cuprum::Error.new(message: 'Something went wrong.')
        end
        let(:destroy_result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(find_result)
          allow(destroy_operation).to receive(:call).and_return(destroy_result)
        end

        it 'should call the find operation' do
          controller.send :destroy_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should call the destroy operation' do
          controller.send :destroy_resource

          expect(destroy_operation).to have_received(:call).with(widget)
        end

        it 'should return the failing result' do
          expect(controller.send :destroy_resource).to be destroy_result
        end
      end

      context 'when the destroy operation returns a passing result' do
        let(:widget)         { Spec::Widget.new }
        let(:find_result)    { Cuprum::Result.new(value: widget) }
        let(:destroy_result) { Cuprum::Result.new }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(find_result)
          allow(destroy_operation).to receive(:call).and_return(destroy_result)
        end

        it 'should call the find operation' do
          controller.send :destroy_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should call the destroy operation' do
          controller.send :destroy_resource

          expect(destroy_operation).to have_received(:call).with(widget)
        end

        it 'should return a passing result' do
          expect(controller.send :destroy_resource)
            .to be_a_passing_result
            .with_value({})
        end
      end
    end
  end

  describe '#failure' do
    let(:error) { Cuprum::Error.new(message: 'Something went wrong.') }

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:failure, true)
        .with(1).argument
    end

    it 'should return a failing result' do
      expect(controller.send :failure, error)
        .to be_a_failing_result.with_error(error)
    end
  end

  describe '#index' do
    let(:responder) { controller.send(:responder) }
    let(:result)    { Cuprum::Result.new }
    let(:options)   { { action: :index } }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:index_resources)
        .and_return(result)

      allow(responder).to receive(:call)
    end

    it { expect(controller).to respond_to(:index).with(0).arguments }

    it 'should delegate to #index_resources' do
      controller.index

      expect(controller).to have_received(:index_resources)
    end

    it 'should respond with the result' do
      controller.index

      expect(responder).to have_received(:call).with(result, options)
    end
  end

  describe '#index_params' do
    include_context 'with a params hash'

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:resource_params, true)
        .with(0).arguments
    end

    it { expect(controller.send :index_params).to be == {} }

    context 'when params[:order] is set' do
      let(:order)  { 'name:asc' }
      let(:params) { super().merge(order: order) }

      it { expect(controller.send :index_params).to be == { 'order' => order } }
    end
  end

  describe '#index_order' do
    include_context 'with a params hash'

    let(:default_order) { 'created_at:asc' }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:default_order)
        .and_return(default_order)
    end

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:index_order, true)
        .with(0).arguments
    end

    it { expect(controller.send :index_order).to be default_order }

    context 'when params[:order] is set' do
      let(:order)  { 'name:asc' }
      let(:params) { super().merge(order: order) }

      it { expect(controller.send :index_order).to be == order }
    end
  end

  describe '#index_resources' do
    include_context 'with a params hash'

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:index_resources, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:find_operation) { instance_double(Cuprum::Operation) }
      let(:default_order)  { controller.send :default_order }

      before(:example) do
        allow(Spec::Widget::Factory)
          .to receive(:find_matching)
          .and_return(find_operation)
      end

      context 'when the sort params are invalid' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call)

          allow(controller) # rubocop:disable RSpec/SubjectStub
            .to receive(:normalize_sort)
            .and_return(result)
        end

        it 'should not call the find operation' do
          controller.send :index_resources

          expect(find_operation).not_to have_received(:call)
        end

        it 'should return the failing result' do
          expect(controller.send :index_resources).to be result
        end
      end

      context 'when the find operation returns a failing result' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :index_resources

          expect(find_operation)
            .to have_received(:call)
            .with(order: default_order)
        end

        it 'should return the failing result' do
          expect(controller.send :index_resources).to be result
        end
      end

      context 'when the find operation returns a passing result with no data' do
        let(:result) { Cuprum::Result.new(value: []) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :index_resources

          expect(find_operation)
            .to have_received(:call)
            .with(order: default_order)
        end

        it 'should return a passing result' do
          expect(controller.send :index_resources)
            .to be_a_passing_result
            .with_value('widgets' => [])
        end
      end

      context 'when the find operation returns a passing result with data' do
        let(:widgets) do
          [
            Spec::Widget.new(name: 'Gadget'),
            Spec::Widget.new(name: 'Sprocket'),
            Spec::Widget.new(name: 'Thing-a-ma-bob')
          ]
        end
        let(:result) { Cuprum::Result.new(value: widgets) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :index_resources

          expect(find_operation)
            .to have_received(:call)
            .with(order: default_order)
        end

        it 'should return a passing result' do
          expect(controller.send :index_resources)
            .to be_a_passing_result
            .with_value('widgets' => widgets)
        end

        context 'when params[:order] is set' do
          let(:order)  { 'level:asc::name:asc' }
          let(:params) { super().merge(order: order) }

          it 'should call the find operation' do
            controller.send :index_resources

            expect(find_operation)
              .to have_received(:call)
              .with(order: { 'level' => 'asc', 'name' => 'asc' })
          end

          it 'should return a passing result' do
            expect(controller.send :index_resources)
              .to be_a_passing_result
              .with_value('widgets' => widgets)
          end
        end
      end
    end
  end

  describe '#normalize_sort' do
    def normalize(value)
      controller.send :normalize_sort, value
    end

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:normalize_sort, true)
        .with(1).argument
    end

    describe 'with nil' do
      it { expect(normalize nil).to be == {} }
    end

    describe 'with an object' do
      let(:object) { Object.new.freeze }
      let(:expected_error) do
        Errors::InvalidParameters.new(errors: [['order', 'is invalid']])
      end

      it 'should return a failing result' do
        expect(normalize object)
          .to be_a_failing_result
          .with_error(expected_error)
      end
    end

    describe 'with an empty Hash' do
      it { expect(normalize({})).to be == {} }
    end

    describe 'with a Hash with values' do
      let(:hash) { { level: :asc, name: :asc } }

      it { expect(normalize hash).to be == hash }
    end

    describe 'with an empty String' do
      it { expect(normalize '').to be == {} }
    end

    describe 'with a String with a value of :asc' do
      it { expect(normalize 'name:asc').to be == { 'name' => 'asc' } }
    end

    describe 'with a String with a value of :ascending' do
      it { expect(normalize 'name:ascending').to be == { 'name' => 'asc' } }
    end

    describe 'with a String with multiple tuples' do
      it 'should convert the string to a hash' do
        expect(normalize 'level:desc::name:asc')
          .to be == { 'level' => 'desc', 'name' => 'asc' }
      end
    end
  end

  describe '#operation_factory' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:operation_factory, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      it 'should delegate to the resource class' do
        expect(controller.send :operation_factory).to be Spec::Widget::Factory
      end
    end
  end

  describe '#permitted_attributes' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:permitted_attributes, true)
        .with(0).arguments
    end

    it { expect(controller.send :permitted_attributes).to be == [] }
  end

  describe '#plural_resource_name' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:plural_resource_name, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      it { expect(controller.send :plural_resource_name).to be == 'widgets' }
    end
  end

  describe '#require_resource_params' do
    include_context 'with a params hash'

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:require_resource_params, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:expected_error) do
        Cuprum::Error.new(
          message: 'No attributes are permitted for the current action'
        )
      end

      it 'should return a failing result' do
        expect(controller.send :require_resource_params)
          .to be_a_failing_result.with_error(expected_error)
      end

      context 'when permitted_attributes is set' do
        let(:permitted_attributes) { %i[manufacturer name] }
        let(:expected_error) do
          Errors::InvalidParameters.new(
            errors: [['widget', "can't be blank"]]
          )
        end

        before(:example) do
          allow(controller) # rubocop:disable RSpec/SubjectStub
            .to receive(:permitted_attributes)
            .and_return(permitted_attributes)
        end

        it 'should return a failing result' do
          expect(controller.send :require_resource_params)
            .to be_a_failing_result.with_error(expected_error)
        end
      end

      context 'when params[resource_name] is set' do
        let(:attributes) do
          {
            'manufacturer'  => 'Aliens',
            'name'          => 'Alien Mothership',
            'vulnerability' => "Jeff Goldblumn's laptop"
          }
        end
        let(:params) { super().merge(widget: attributes) }

        it 'should return a failing result' do
          expect(controller.send :require_resource_params)
            .to be_a_failing_result.with_error(expected_error)
        end

        context 'when permitted_attributes is set' do
          let(:permitted_attributes) { %i[manufacturer name] }
          let(:expected) do
            attributes.slice('manufacturer', 'name')
          end

          before(:example) do
            allow(controller) # rubocop:disable RSpec/SubjectStub
              .to receive(:permitted_attributes)
              .and_return(permitted_attributes)
          end

          it 'should return a passing result' do
            expect(controller.send :require_resource_params)
              .to be_a_passing_result.with_value(expected)
          end
        end
      end
    end
  end

  describe '#resource_id' do
    include_context 'with a params hash'

    it 'should define the private method' do
      expect(controller).to respond_to(:resource_id, true).with(0).arguments
    end

    it { expect(controller.send :resource_id).to be nil }

    context 'when params[:id] is set' do
      let(:id)     { '00000000-0000-0000-0000-000000000000' }
      let(:params) { super().merge(id: id) }

      it { expect(controller.send :resource_id).to be == id }
    end
  end

  describe '#resource_name' do
    it 'should define the private method' do
      expect(controller)
        .to respond_to(:resource_name, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      it { expect(controller.send :resource_name).to be == 'widget' }
    end
  end

  describe '#resource_params' do
    include_context 'with a params hash'

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:resource_params, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      it { expect(controller.send :resource_params).to be == {} }

      context 'when permitted_attributes is set' do
        let(:permitted_attributes) { %i[manufacturer name] }

        before(:example) do
          allow(controller) # rubocop:disable RSpec/SubjectStub
            .to receive(:permitted_attributes)
            .and_return(permitted_attributes)
        end

        it { expect(controller.send :resource_params).to be == {} }
      end

      context 'when params[resource_name] is set' do
        let(:attributes) do
          {
            'manufacturer'  => 'Aliens',
            'name'          => 'Alien Mothership',
            'vulnerability' => "Jeff Goldblumn's laptop"
          }
        end
        let(:params) { super().merge(widget: attributes) }

        it { expect(controller.send :resource_params).to be == {} }

        context 'when permitted_attributes is set' do
          let(:permitted_attributes) { %i[manufacturer name] }
          let(:expected) do
            attributes.slice('manufacturer', 'name')
          end

          before(:example) do
            allow(controller) # rubocop:disable RSpec/SubjectStub
              .to receive(:permitted_attributes)
              .and_return(permitted_attributes)
          end

          it { expect(controller.send :resource_params).to be == expected }
        end
      end
    end
  end

  describe '#responder' do
    let(:responder) { controller.send :responder }

    it 'should define the private method' do
      expect(controller).to respond_to(:responder, true).with(0).arguments
    end

    it { expect(responder).to be_a Responders::JsonResponder }

    it { expect(responder.controller).to be controller }
  end

  describe '#show' do
    let(:responder) { controller.send(:responder) }
    let(:result)    { Cuprum::Result.new }
    let(:options)   { { action: :show } }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:show_resource)
        .and_return(result)

      allow(responder).to receive(:call)
    end

    it { expect(controller).to respond_to(:show).with(0).arguments }

    it 'should delegate to #show_resource' do
      controller.show

      expect(controller).to have_received(:show_resource)
    end

    it 'should respond with the result' do
      controller.show

      expect(responder).to have_received(:call).with(result, options)
    end
  end

  describe '#show_resource' do
    include_context 'with a params hash'

    let(:resource_id) { '00000000-0000-0000-0000-000000000000' }
    let(:params)      { { id: resource_id } }

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:show_resource, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:find_operation) { instance_double(Cuprum::Operation) }

      before(:example) do
        allow(Spec::Widget::Factory)
          .to receive(:find_one)
          .and_return(find_operation)
      end

      context 'when the find operation returns a failing result' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :show_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should return the failing result' do
          expect(controller.send :show_resource).to be result
        end
      end

      context 'when the find operation returns a passing result' do
        let(:widget) { Spec::Widget.new }
        let(:result) { Cuprum::Result.new(value: widget) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :show_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should return a passing result' do
          expect(controller.send :show_resource)
            .to be_a_passing_result
            .with_value('widget' => widget)
        end
      end
    end
  end

  describe '#success' do
    let(:value) { 'result value' }

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:success, true)
        .with(1).argument
    end

    it 'should return a passing result' do
      expect(controller.send :success, value)
        .to be_a_passing_result.with_value(value)
    end
  end

  describe '#update' do
    let(:responder) { controller.send(:responder) }
    let(:result)    { Cuprum::Result.new }
    let(:options)   { { action: :update } }

    before(:example) do
      allow(controller) # rubocop:disable RSpec/SubjectStub
        .to receive(:update_resource)
        .and_return(result)

      allow(responder).to receive(:call)
    end

    it { expect(controller).to respond_to(:update).with(0).arguments }

    it 'should delegate to #update_resource' do
      controller.update

      expect(controller).to have_received(:update_resource)
    end

    it 'should respond with the result' do
      controller.update

      expect(responder).to have_received(:call).with(result, options)
    end
  end

  describe '#update_resource' do
    include_context 'with a params hash'

    let(:resource_id) { '00000000-0000-0000-0000-000000000000' }
    let(:params)      { { id: resource_id } }

    it 'should define the private method' do
      expect(controller)
        .to respond_to(:update_resource, true)
        .with(0).arguments
    end

    wrap_context 'with a controller subclass' do
      let(:find_operation)   { instance_double(Cuprum::Operation) }
      let(:update_operation) { instance_double(Cuprum::Operation) }
      let(:resource_params)  { { name: 'Self-sealing Stem Bolt' } }

      before(:example) do
        allow(Spec::Widget::Factory)
          .to receive(:find_one)
          .and_return(find_operation)

        allow(Spec::Widget::Factory)
          .to receive(:update)
          .and_return(update_operation)

        allow(controller) # rubocop:disable RSpec/SubjectStub
          .to receive(:require_resource_params)
          .and_return(resource_params)
      end

      context 'when the resource params are missing' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(controller) # rubocop:disable RSpec/SubjectStub
            .to receive(:require_resource_params)
            .and_return(result)
        end

        it 'should return the failing result' do
          expect(controller.send :update_resource).to be result
        end
      end

      context 'when the find operation returns a failing result' do
        let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
        let(:result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(result)
        end

        it 'should call the find operation' do
          controller.send :update_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should return the failing result' do
          expect(controller.send :update_resource).to be result
        end
      end

      context 'when the update operation returns a failing result' do
        let(:widget)         { Spec::Widget.new }
        let(:find_result)    { Cuprum::Result.new(value: widget) }
        let(:error) do
          Cuprum::Error.new(message: 'Something went wrong.')
        end
        let(:update_result) { Cuprum::Result.new(error: error) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(find_result)
          allow(update_operation).to receive(:call).and_return(update_result)
        end

        it 'should call the find operation' do
          controller.send :update_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should call the update operation' do
          controller.send :update_resource

          expect(update_operation)
            .to have_received(:call)
            .with(widget, resource_params)
        end

        it 'should return the failing result' do
          expect(controller.send :update_resource).to be update_result
        end
      end

      context 'when the update operation returns a passing result' do
        let(:widget)         { Spec::Widget.new }
        let(:find_result)    { Cuprum::Result.new(value: widget) }
        let(:updated_widget) { Spec::Widget.new(resource_params) }
        let(:update_result)  { Cuprum::Result.new(value: updated_widget) }

        before(:example) do
          allow(find_operation).to receive(:call).and_return(find_result)
          allow(update_operation).to receive(:call).and_return(update_result)
        end

        it 'should call the find operation' do
          controller.send :update_resource

          expect(find_operation).to have_received(:call).with(resource_id)
        end

        it 'should call the update operation' do
          controller.send :update_resource

          expect(update_operation)
            .to have_received(:call)
            .with(widget, resource_params)
        end

        it 'should return a passing result' do
          expect(controller.send :update_resource)
            .to be_a_passing_result
            .with_value('widget' => updated_widget)
        end
      end
    end
  end
end
