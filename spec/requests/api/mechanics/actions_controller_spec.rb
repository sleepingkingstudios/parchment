# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::Mechanics::ActionsController do
  include Spec::Support::Examples::ControllerExamples

  def self.resource_name
    :action
  end

  let(:resource_class) { Mechanics::Action }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/mechanics/actions.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      { 'actions' => [] }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/mechanics/actions.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the actions' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many resources' do
      let(:action_serializer) { Serializers::MechanicSerializer.new }
      let(:serialized_actions) do
        actions
          .sort_by(&:name)
          .map { |action| action_serializer.serialize(action) }
      end
      let(:expected_data) do
        { 'actions' => serialized_actions }
      end

      it 'should serialize the actions' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'POST /api/mechanics/actions.json' do
    include_context 'with an authorization token for a user'

    let(:params)        { super().merge(mechanic: action_params) }
    let(:action_params) { { name: 'Explode' } }

    def call_action
      post '/api/mechanics/actions.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require resource params', :mechanic

    describe 'with invalid attributes' do
      let(:action_params) do
        { name: 'Explode' }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'description',
                "can't be blank"
              ],
              [
                'short_description',
                "can't be blank"
              ]
            ],
            'record_class' => 'Mechanics::Action'
          },
          'message' => 'Mechanics::Action has validation errors: description' \
                       " can't be blank, short_description can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should not create the action', :aggregate_failures do
        expect { call_action }.not_to change(Mechanics::Action, :count)

        query = Mechanics::Action.where(name: action_params[:name])

        expect(query.exists?).to be false
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:action_params) do
        {
          description:       'Go boom!',
          name:              'Explode',
          short_description: 'Boom!'
        }
      end
      let(:created_action) do
        Mechanics::Action.where(name: 'Explode').first
      end
      let(:expected_json) do
        serializer = Serializers::MechanicSerializer.new

        {
          'ok'   => true,
          'data' => {
            'action' => serializer.serialize(created_action)
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should serialize the action' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should create the book', :aggregate_failures do
        expect { call_action }.to change(Mechanics::Action, :count).by(1)

        query = Mechanics::Action.where(name: action_params[:name])

        expect(query.exists?).to be true

        action = query.first

        action_params.each do |attribute, value|
          expect(action.send attribute).to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'GET /api/mechanics/actions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:action)    { actions.first }
    let(:action_id) { action.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'action' => Serializers.serialize(action)
        }
      }
    end

    def call_action
      get "/api/mechanics/actions/#{action_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the action' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end

  describe 'PATCH /api/mechanics/actions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:params)        { super().merge(mechanic: action_params) }
    let(:action)        { actions.first }
    let(:action_id)     { action.id }
    let(:action_params) { { name: 'Explode' } }

    def call_action
      patch "/api/mechanics/actions/#{action_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should require resource params', :mechanic

    describe 'with invalid attributes' do
      let(:action_params) do
        {
          description:       nil,
          name:              'Explode',
          short_description: nil
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'description',
                "can't be blank"
              ],
              [
                'short_description',
                "can't be blank"
              ]
            ],
            'record_class' => 'Mechanics::Action'
          },
          'message' => 'Mechanics::Action has validation errors: description' \
                       " can't be blank, short_description can't be blank",
          'type'    => 'failed_validation'
        }
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should not update the action' do
        call_action

        action = Mechanics::Action.find(action_id)

        action_params.each do |attribute, value|
          expect(action.send attribute).not_to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:action_params) do
        {
          description:       'Go boom!',
          name:              'Explode',
          short_description: 'Boom!'
        }
      end
      let(:params) { super().merge(mechanic: action_params) }
      let(:updated_action) do
        Mechanics::Action.where(name: 'Explode').first
      end
      let(:expected_json) do
        serializer = Serializers::MechanicSerializer.new

        {
          'ok'   => true,
          'data' => {
            'action' => serializer.serialize(updated_action)
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should serialize the action' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should update the action', :aggregate_failures do
        call_action

        action = Mechanics::Action.find(action_id)

        action_params.each do |attribute, value|
          expect(action.send attribute).to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'DELETE /api/mechanics/actions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:action)    { actions.first }
    let(:action_id) { action.id }
    let(:expected_json) do
      {
        'data' => {},
        'ok'   => true
      }
    end

    def call_action
      delete "/api/mechanics/actions/#{action_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the response' do
      call_action

      expect(json).to deep_match expected_json
    end

    it 'should destroy the action', :aggregate_failures do
      expect { call_action }.to change(Mechanics::Action, :count).by(-1)

      query = Mechanics::Action.where(id: action_id)

      expect(query.exists?).to be false
    end

    include_examples 'should respond with JSON content'
  end
end
