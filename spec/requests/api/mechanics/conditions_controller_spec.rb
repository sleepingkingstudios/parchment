# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::Mechanics::ConditionsController do
  include Spec::Support::Examples::ControllerExamples

  def self.resource_name
    :condition
  end

  let(:resource_class) { Mechanics::Condition }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/mechanics/conditions.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      { 'conditions' => [] }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/mechanics/conditions.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the conditions' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many resources' do
      let(:conditions_serializer) { Serializers::MechanicSerializer.new }
      let(:serialized_conditions) do
        conditions
          .sort_by(&:name)
          .map { |condition| conditions_serializer.serialize(condition) }
      end
      let(:expected_data) do
        { 'conditions' => serialized_conditions }
      end

      it 'should serialize the conditions' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'POST /api/mechanics/conditions.json' do
    include_context 'with an authorization token for a user'

    let(:params)           { super().merge(mechanic: condition_params) }
    let(:condition_params) { { name: 'Lethargy' } }

    def call_action
      post '/api/mechanics/conditions.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require resource params', :mechanic

    describe 'with invalid attributes' do
      let(:condition_params) { { name: 'Lethargy' } }
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
            'record_class' => 'Mechanics::Condition'
          },
          'message' => 'Mechanics::Condition has validation errors:' \
                       " description can't be blank, short_description can't" \
                       ' be blank',
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

      it 'should not create the condition', :aggregate_failures do
        expect { call_action }.not_to change(Mechanics::Condition, :count)

        query = Mechanics::Condition.where(name: condition_params[:name])

        expect(query.exists?).to be false
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:condition_params) do
        {
          description:       'Sleepy sleepy.',
          name:              'Lethargy',
          short_description: 'Sleepy.'
        }
      end
      let(:created_condition) do
        Mechanics::Condition.where(name: 'Lethargy').first
      end
      let(:expected_json) do
        serializer = Serializers::MechanicSerializer.new

        {
          'ok'   => true,
          'data' => {
            'condition' => serializer.serialize(created_condition)
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should serialize the condition' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should create the book', :aggregate_failures do
        expect { call_action }.to change(Mechanics::Condition, :count).by(1)

        query = Mechanics::Condition.where(name: condition_params[:name])

        expect(query.exists?).to be true

        condition = query.first

        condition_params.each do |attribute, value|
          expect(condition.send attribute).to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'GET /api/mechanics/conditions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:condition)    { conditions.first }
    let(:condition_id) { condition.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'condition' => Serializers.serialize(condition)
        }
      }
    end

    def call_action
      get "/api/mechanics/conditions/#{condition_id}.json",
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

  describe 'PATCH /api/mechanics/conditions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:params)           { super().merge(mechanic: condition_params) }
    let(:condition)        { conditions.first }
    let(:condition_id)     { condition.id }
    let(:condition_params) { { name: 'Lethargy' } }

    def call_action
      patch "/api/mechanics/conditions/#{condition_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should require resource params', :mechanic

    describe 'with invalid attributes' do
      let(:condition_params) do
        {
          description:       nil,
          name:              'Lethargy',
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
            'record_class' => 'Mechanics::Condition'
          },
          'message' => 'Mechanics::Condition has validation errors:' \
                       " description can't be blank, short_description can't" \
                       ' be blank',
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

      it 'should not update the condition' do
        call_action

        condition = Mechanics::Condition.find(condition_id)

        condition_params.each do |attribute, value|
          expect(condition.send attribute).not_to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:condition_params) do
        {
          description:       'Sleepy sleepy.',
          name:              'Lethargy',
          short_description: 'Sleepy.'
        }
      end
      let(:params) { super().merge(mechanic: condition_params) }
      let(:updated_condition) do
        Mechanics::Condition.where(name: 'Lethargy').first
      end
      let(:expected_json) do
        serializer = Serializers::MechanicSerializer.new

        {
          'ok'   => true,
          'data' => {
            'condition' => serializer.serialize(updated_condition)
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should serialize the condition' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should update the condition', :aggregate_failures do
        call_action

        condition = Mechanics::Condition.find(condition_id)

        condition_params.each do |attribute, value|
          expect(condition.send attribute).to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end
  end

  describe 'DELETE /api/mechanics/conditions/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many resources'

    let(:condition)    { conditions.first }
    let(:condition_id) { condition.id }
    let(:expected_json) do
      {
        'data' => {},
        'ok'   => true
      }
    end

    def call_action
      delete "/api/mechanics/conditions/#{condition_id}.json",
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
      expect { call_action }.to change(Mechanics::Condition, :count).by(-1)

      query = Mechanics::Condition.where(id: condition_id)

      expect(query.exists?).to be false
    end

    include_examples 'should respond with JSON content'
  end
end
