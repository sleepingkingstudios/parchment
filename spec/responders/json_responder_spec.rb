# frozen_string_literal: true

require 'rails_helper'

require 'responders/json_responder'

RSpec.describe Responders::JsonResponder do
  subject(:responder) { described_class.new(controller) }

  let(:controller) { instance_double(ApplicationController) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    before(:example) { allow(controller).to receive(:render) }

    it 'should define the method' do
      expect(responder)
        .to respond_to(:call)
        .with(1).argument
        .and_keywords(:status)
        .and_any_keywords
    end

    describe 'with a failing result with error: Authentication::Base' do
      let(:error)  { Errors::Authentication::Base.new }
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => { 'message' => 'Unable to authenticate user.' }
        }
      end
      let(:expected) { { json: json, status: :unauthorized } }

      it 'should render 401 Unauthorized with the error details' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 401 Unauthorized with the error details' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a failing result with error: Authentication::FailedLogin' do
      let(:message) { 'Something went wrong.' }
      let(:error) do
        Errors::Authentication::FailedLogin.new(message: message)
      end
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => {
            'message' => 'Unable to log in with the given credentials'
          }
        }
      end
      let(:expected) { { json: json, status: :forbidden } }

      it 'should render 403 Forbidden with the error details' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 403 Forbidden with the error details' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a failing result with error: FailedValidation' do
      let(:record) { Spell.new }
      let(:error)  { Errors::FailedValidation.new(record: record) }
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => error.as_json
        }
      end
      let(:expected) { { json: json, status: :unprocessable_entity } }

      it 'should render 422 Unprocessable Entity with the error details' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 422 Unprocessable Entity with the error details' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a failing result with error: InvalidParameters' do
      let(:error)  { Errors::InvalidParameters.new(errors: []) }
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => error.as_json
        }
      end
      let(:expected) { { json: json, status: :bad_request } }

      it 'should render 400 Bad Request with the error details' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 400 Bad Request with the error details' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a failing result with error: NotFound' do
      let(:record_class) { Spell }
      let(:attributes)   { { id: '00000000-0000-0000-0000-000000000000' } }
      let(:error) do
        Errors::NotFound.new(attributes: attributes, record_class: record_class)
      end
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => error.as_json
        }
      end
      let(:expected) { { json: json, status: :not_found } }

      it 'should render 404 Not Found with the error details' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 404 Not Found with the error details' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a failing result with error: unknown error' do
      let(:error)  { Cuprum::Error.new(message: 'Something went wrong.') }
      let(:result) { Cuprum::Result.new(error: error) }
      let(:json) do
        {
          'ok'    => false,
          'error' => {
            'message' => 'Something went wrong when processing the request.'
          }
        }
      end
      let(:expected) { { json: json, status: :internal_server_error } }

      it 'should render 500 Internal Server Error with a generic error' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options) { { status: :forbidden } }

        it 'should render 500 Internal Server Error with a generic error' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with an unserializable resource' do
      let(:object) { Object.new }
      let(:result) { Cuprum::Result.new(value: { object: object }) }
      let(:json) do
        {
          'ok'    => false,
          'error' => {
            'message' => 'Something went wrong when processing the request.'
          }
        }
      end
      let(:expected) { { json: json, status: :internal_server_error } }
      let(:controller_class) do
        instance_double(Class, name: 'Api::WidgetsController')
      end
      let(:log_message) do
        "Internal Server Error in #{controller_class.name}: No serializer" \
        ' defined for Object (Serializers::UndefinedSerializerError)'
      end

      before(:example) do
        allow(controller).to receive(:class).and_return(controller_class)

        allow(Rails.logger).to receive(:error)
      end

      it 'should render 500 Internal Server Error with a generic JSON error' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      it 'should log the exception' do
        responder.call(result)

        expect(Rails.logger).to have_received(:error).with(log_message)
      end

      describe 'with options[:action] => value' do
        let(:log_message) do
          "Internal Server Error in #{controller_class.name}##{action}: No" \
          ' serializer defined for Object' \
          ' (Serializers::UndefinedSerializerError)'
        end
        let(:action) { :create }
        let(:options) { { action: action } }

        it 'should log the exception' do
          responder.call(result, options)

          expect(Rails.logger).to have_received(:error).with(log_message)
        end
      end
    end

    describe 'with a passing result with an unserializable array' do
      let(:objects) { Array.new(3) { Object.new } }
      let(:result)  { Cuprum::Result.new(value: { objects: objects }) }
      let(:json) do
        {
          'ok'    => false,
          'error' => {
            'message' => 'Something went wrong when processing the request.'
          }
        }
      end
      let(:expected) { { json: json, status: :internal_server_error } }
      let(:controller_class) do
        instance_double(Class, name: 'Api::WidgetsController')
      end
      let(:log_message) do
        "Internal Server Error in #{controller_class.name}: No serializer" \
        ' defined for Object (Serializers::UndefinedSerializerError)'
      end

      before(:example) do
        allow(controller).to receive(:class).and_return(controller_class)

        allow(Rails.logger).to receive(:error)
      end

      it 'should render 500 Internal Server Error with a generic JSON error' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      it 'should log the exception' do
        responder.call(result)

        expect(Rails.logger).to have_received(:error).with(log_message)
      end

      describe 'with options[:action] => value' do
        let(:log_message) do
          "Internal Server Error in #{controller_class.name}##{action}: No" \
          ' serializer defined for Object' \
          ' (Serializers::UndefinedSerializerError)'
        end
        let(:action) { :create }
        let(:options) { { action: action } }

        it 'should log the exception' do
          responder.call(result, options)

          expect(Rails.logger).to have_received(:error).with(log_message)
        end
      end
    end

    describe 'with a passing result with a mixed plural resource' do
      let(:book) { FactoryBot.build(:book) }
      let(:spells) do
        [
          FactoryBot.build(:spell),
          book,
          FactoryBot.build(:spell)
        ]
      end
      let(:result) { Cuprum::Result.new(value: { spells: spells }) }
      let(:json) do
        {
          'ok'    => false,
          'error' => {
            'message' => 'Something went wrong when processing the request.'
          }
        }
      end
      let(:expected) { { json: json, status: :internal_server_error } }
      let(:controller_class) do
        instance_double(Class, name: 'Api::WidgetsController')
      end
      let(:log_message) do
        "Internal Server Error in #{controller_class.name}: Unable to" \
        " serialize #{book.inspect} with Serializers::SpellSerializer" \
        ' (Serializers::InvalidObjectError)'
      end

      before(:example) do
        allow(controller).to receive(:class).and_return(controller_class)

        allow(Rails.logger).to receive(:error)
      end

      it 'should render 500 Internal Server Error with a generic JSON error' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      it 'should log the exception' do
        responder.call(result)

        expect(Rails.logger).to have_received(:error).with(log_message)
      end

      describe 'with options[:action] => value' do
        let(:log_message) do
          "Internal Server Error in #{controller_class.name}##{action}:" \
          " Unable to serialize #{book.inspect} with" \
          ' Serializers::SpellSerializer (Serializers::InvalidObjectError)'
        end
        let(:action) { :create }
        let(:options) { { action: action } }

        it 'should log the exception' do
          responder.call(result, options)

          expect(Rails.logger).to have_received(:error).with(log_message)
        end
      end
    end

    describe 'with a passing result with a nil value' do
      let(:result) { Cuprum::Result.new(value: nil) }
      let(:json) do
        {
          'ok'   => true,
          'data' => {}
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with an empty Hash value' do
      let(:data)   { {} }
      let(:result) { Cuprum::Result.new(value: data) }
      let(:json) do
        {
          'ok'   => true,
          'data' => data
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with one singular resource' do
      let(:spell)  { FactoryBot.build(:spell) }
      let(:result) { Cuprum::Result.new(value: { spell: spell }) }
      let(:json) do
        {
          'ok'   => true,
          'data' => {
            'spell' => Serializers.serialize(spell)
          }
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK and serialize the resource' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created and serialize the resource' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with an empty plural resource' do
      let(:result) { Cuprum::Result.new(value: { spells: [] }) }
      let(:json) do
        {
          'ok'   => true,
          'data' => { 'spells' => [] }
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK and serialize the resource' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created and serialize the resource' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with one plural resource' do
      let(:spells) { Array.new(3) { FactoryBot.build(:spell) } }
      let(:result) { Cuprum::Result.new(value: { spells: spells }) }
      let(:json) do
        {
          'ok'   => true,
          'data' => {
            'spells' => spells.map { |spell| Serializers.serialize(spell) }
          }
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK and serialize the resource' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created and serialize the resource' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end

    describe 'with a passing result with multiple resources' do
      let(:book)   { FactoryBot.build(:book) }
      let(:spells) { Array.new(3) { FactoryBot.build(:spell) } }
      let(:result) do
        Cuprum::Result.new(
          value: {
            book:   book,
            spells: spells
          }
        )
      end
      let(:json) do
        {
          'ok'   => true,
          'data' => {
            'book'   => Serializers.serialize(book),
            'spells' => spells.map { |spell| Serializers.serialize(spell) }
          }
        }
      end
      let(:expected) { { json: json, status: :ok } }

      it 'should render 200 OK and serialize the resource' do
        responder.call(result)

        expect(controller).to have_received(:render).with(expected)
      end

      describe 'with status: value' do
        let(:options)  { { status: :created } }
        let(:expected) { { json: json, status: :created } }

        it 'should render 201 Created and serialize the resource' do
          responder.call(result, options)

          expect(controller).to have_received(:render).with(expected)
        end
      end
    end
  end

  describe '#controller' do
    include_examples 'should define reader', :controller, -> { controller }
  end
end
