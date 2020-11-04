# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

require 'support/examples/controller_examples'

RSpec.describe Api::Reference::SkillsController, type: :request do
  include Spec::Support::Examples::ControllerExamples

  shared_context 'when there are many skills' do
    include_context 'when there are many resources'

    let(:sources) do
      skills.sort_by(&:name)[0...-1].map do |skill|
        FactoryBot.build(:source, :with_book, reference: skill)
      end
    end

    before(:example) { sources.each(&:save!) }
  end

  def self.resource_name
    :skill
  end

  let(:resource_class) { References::Skill }
  let(:resource_name)  { self.class.resource_name }

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/skills.json' do
    include_context 'with an authorization token for a user'

    let(:expected_data) do
      {
        'skills'  => [],
        'sources' => []
      }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/reference/skills.json', headers: headers, params: params
    end

    include_examples 'should require an authenticated user'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the skills' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    wrap_context 'when there are many skills' do
      let(:serialized_skills) do
        skills
          .sort_by(&:name)
          .map { |skill| Serializers.serialize(skill) }
      end
      let(:serialized_sources) do
        sources.map { |source| Serializers.serialize(source) }
      end
      let(:expected_data) do
        {
          'skills'  => serialized_skills,
          'sources' => serialized_sources
        }
      end

      it 'should serialize the skills' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'GET /api/skills/:id.json' do
    include_context 'with an authorization token for a user'
    include_context 'when there are many skills'

    let(:skill)    { skills.first }
    let(:skill_id) { skill.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'skill'  => Serializers.serialize(skill),
          'source' => Serializers.serialize(skill.source)
        }
      }
    end

    def call_action
      get "/api/reference/skills/#{skill_id}.json",
        headers: headers,
        params:  params
    end

    include_examples 'should require an authenticated user'

    include_examples 'should require a valid resource id'

    include_examples 'should find the resource by slug'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the skill' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end
end
