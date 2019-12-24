# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

RSpec.describe Api::SpellsController do
  shared_context 'when there are many spells' do
    let(:spells) { Fixtures.build(Spell, count: 3) }
    let(:sources) do
      spells.sort_by(&:name)[0...-1].map do |spell|
        FactoryBot.build(:source, :with_book, reference: spell)
      end
    end

    before(:each) do
      spells.each(&:save!)
      sources.each(&:save!)
    end
  end

  shared_examples 'should require a valid spell id' do
    describe 'with an invalid spell id' do
      let(:spell_id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_error) do
        Errors::NotFound.new(
          attributes:   { id: spell_id },
          record_class: Spell
        )
      end
      let(:expected_json) do
        {
          'error' => expected_error.as_json,
          'ok'    => false
        }
      end

      it 'should respond with 404 Not Found' do
        call_action

        expect(response).to have_http_status(:not_found)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to deep_match expected_json
      end

      include_examples 'should respond with JSON content'
    end
  end

  shared_examples 'should require valid spell params' do
    describe 'with missing spell params' do
      let(:expected_error) do
        Errors::InvalidParameters.new(
          errors: [['spell', "can't be blank"]]
        ).as_json
      end
      let(:expected_json) do
        {
          'ok'    => false,
          'error' => expected_error
        }
      end
      let(:params) { super().tap { |hsh| hsh.delete :spell } }

      it 'should respond with 400 Bad Request' do
        call_action

        expect(response).to have_http_status(:bad_request)
      end

      it 'should serialize the error' do
        call_action

        expect(json).to deep_match expected_json
      end

      include_examples 'should respond with JSON content'
    end
  end

  shared_examples 'should respond with JSON content' do
    it 'should respond with JSON content' do
      call_action

      expect(response.content_type).to be == 'application/json; charset=utf-8'
    end
  end

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/spells.json' do
    let(:expected_data) do
      {
        'sources' => [],
        'spells'  => []
      }
    end
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => expected_data
      }
    end

    def call_action
      get '/api/spells.json', headers: headers, params: params
    end

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the spells' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'

    context 'when there are many spells' do
      include_context 'when there are many spells'

      let(:spell_serializer)  { Serializers::SpellSerializer.new }
      let(:source_serializer) { Serializers::SourceSerializer.new }
      let(:serialized_spells) do
        spells
          .sort_by(&:name)
          .map { |spell| spell_serializer.serialize(spell) }
      end
      let(:serialized_sources) do
        sources.map { |source| source_serializer.serialize(source) }
      end
      let(:expected_data) do
        {
          'sources' => serialized_sources,
          'spells'  => serialized_spells
        }
      end

      it 'should serialize the spells' do
        call_action

        expect(json).to deep_match expected_json
      end
    end
  end

  describe 'POST /api/spells.json' do
    let(:params)       { super().merge(spell: spell_params) }
    let(:spell_params) { { name: 'Invoked Apocalypse' } }

    def call_action
      post '/api/spells.json', headers: headers, params: params
    end

    include_examples 'should require valid spell params'

    describe 'with invalid attributes' do
      let(:spell_params) do
        {
          name:         'Fire Festival',
          casting_time: nil,
          duration:     'Too Long',
          level:        10,
          range:        'Foreman',
          school:       'Transubstantiation',
          description:  <<~DESCRIPTION
            Pretend to hold a music festival. Rake in the dough, yo.
          DESCRIPTION
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'casting_time',
                "can't be blank"
              ],
              [
                'level',
                'must be less than or equal to 9'
              ],
              [
                'school',
                'must be abjuration, conjuration, divination, enchantment, ' \
                'evocation, illusion, necromancy, or transmutation'
              ]
            ],
            'record_class' => 'Spell'
          },
          'message' => "Spell has validation errors: casting_time can't be" \
                       ' blank, level must be less than or equal to 9, school' \
                       ' must be abjuration, conjuration, divination,' \
                       ' enchantment, evocation, illusion, necromancy,' \
                       ' or transmutation',
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

      # rubocop:disable RSpec/MultipleExpectations
      it 'should not create the spell' do
        expect { call_action }.not_to change(Spell, :count)

        query = Spell.where(name: spell_params[:name])

        expect(query.exists?).to be false
      end
      # rubocop:enable RSpec/MultipleExpectations

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:spell_params) do
        {
          name:              'Glowing Gaze',
          slug:              'glwng-gz',
          casting_time:      '1 reaction, which you take when a creature' \
                             ' within range takes fire damage',
          duration:          'Instantaneous',
          level:             1,
          range:             '60 feet',
          school:            Spell::Schools::EVOCATION,
          short_description: '2d6 fire damage (Dex save half)',
          description:       <<~DESCRIPTION
            Your eyes glow with an inner fire. The target creature must make a
            Dexterity saving throw. A target takes 2d6 fire damage on a failed
            save, or half as much damage on a successful one.

            **At Higher Levels:** When you cast this spell using a spell slot of
            2nd level or higher, the damage increases by 1d6 for each slot level
            above 1st.
          DESCRIPTION
        }
      end
      let(:created_spell) { Spell.where(name: 'Glowing Gaze').first }
      let(:expected_json) do
        serializer = Serializers::SpellSerializer.new

        {
          'ok'   => true,
          'data' => {
            'spell' => serializer.serialize(created_spell)
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should serialize the spell' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should create the spell', :aggregate_failures do
        expect { call_action }.to change(Spell, :count).by(1)

        query = Spell.where(name: spell_params[:name])

        expect(query.exists?).to be true

        spell = query.first

        spell_params.each do |attribute, value|
          expect(spell.send attribute).to be == value
        end
      end

      it 'should not create a source', :aggregate_failures do
        expect { call_action }.not_to change(Source, :count)

        spell = Spell.where(name: spell_params[:name]).first
        query = Source.where(reference: spell)

        expect(query.exists?).to be false
      end

      include_examples 'should respond with JSON content'

      context 'with params for a source' do
        let(:origin)        { FactoryBot.create(:book) }
        let(:source_params) { { origin_id: origin.id, origin_type: 'Book' } }
        let(:spell_params)  { super().merge(source: source_params) }

        it 'should respond with 201 Created' do
          call_action

          expect(response).to have_http_status(:created)
        end

        it 'should create a source', :aggregate_failures do
          expect { call_action }.to change(Source, :count).by(1)

          spell = Spell.where(name: spell_params[:name]).first
          query = Source.where(reference: spell)

          expect(query.exists?).to be true

          source = query.first

          expect(source.origin).to be == origin
          expect(source.reference).to be == spell
        end
      end
    end
  end

  describe 'GET /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:spell)    { spells.first }
    let(:spell_id) { spell.id }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'source' => Serializers.serialize(spell.source),
          'spell'  => Serializers.serialize(spell)
        }
      }
    end

    def call_action
      get "/api/spells/#{spell_id}.json", headers: headers, params: params
    end

    include_examples 'should require a valid spell id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the spell' do
      call_action

      expect(json).to deep_match expected_json
    end

    include_examples 'should respond with JSON content'
  end

  describe 'PATCH /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:params)       { super().merge(spell: spell_params) }
    let(:spell)        { spells.find { |spell| spell.source.nil? } }
    let(:spell_id)     { spell.id }
    let(:spell_params) { { name: 'Invoked Apocalypse' } }

    def call_action
      patch "/api/spells/#{spell_id}.json", headers: headers, params: params
    end

    include_examples 'should require a valid spell id'

    include_examples 'should require valid spell params'

    describe 'with invalid attributes' do
      let(:spell_params) do
        {
          name:         'Fire Festival',
          casting_time: nil,
          duration:     'Too Long',
          level:        10,
          range:        'Foreman',
          school:       'Transubstantiation'
        }
      end
      let(:expected_error) do
        {
          'data'    => {
            'errors'       => [
              [
                'casting_time',
                "can't be blank"
              ],
              [
                'level',
                'must be less than or equal to 9'
              ],
              [
                'school',
                'must be abjuration, conjuration, divination, enchantment, ' \
                'evocation, illusion, necromancy, or transmutation'
              ]
            ],
            'record_class' => 'Spell'
          },
          'message' => "Spell has validation errors: casting_time can't be" \
                       ' blank, level must be less than or equal to 9, school' \
                       ' must be abjuration, conjuration, divination,' \
                       ' enchantment, evocation, illusion, necromancy,' \
                       ' or transmutation',
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

      it 'should not update the spell' do
        call_action

        spell = Spell.find(spell_id)

        spell_params.each do |attribute, value|
          expect(spell.send attribute).not_to be == value
        end
      end

      include_examples 'should respond with JSON content'
    end

    describe 'with valid attributes' do
      let(:spell_params) do
        {
          name:         'Glowing Gaze',
          casting_time: '1 reaction, which you take when a creature within ' \
                        'range takes fire damage',
          duration:     'Instantaneous',
          level:        1,
          range:        '60 feet',
          school:       Spell::Schools::EVOCATION
        }
      end
      let(:params)        { super().merge(spell: spell_params) }
      let(:updated_spell) { Spell.where(name: 'Glowing Gaze').first }
      let(:expected_json) do
        serializer = Serializers::SpellSerializer.new

        {
          'ok'   => true,
          'data' => {
            'spell' => serializer.serialize(updated_spell)
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should serialize the spell' do
        call_action

        expect(json).to deep_match expected_json
      end

      it 'should update the spell' do
        call_action

        spell = Spell.find(spell_id)

        spell_params.each do |attribute, value|
          expect(spell.send attribute).to be == value
        end
      end

      it 'should not create a source', :aggregate_failures do
        expect { call_action }.not_to change(Source, :count)

        query = Source.where(reference: spell)

        expect(query.exists?).to be false
      end

      include_examples 'should respond with JSON content'

      context 'with params for a source' do
        let(:origin)        { FactoryBot.create(:book) }
        let(:source_params) { { origin_id: origin.id, origin_type: 'Book' } }
        let(:spell_params)  { super().merge(source: source_params) }

        it 'should respond with 200 OK' do
          call_action

          expect(response).to have_http_status(:ok)
        end

        it 'should create a source', :aggregate_failures do
          expect { call_action }.to change(Source, :count).by(1)

          query = Source.where(reference: spell)

          expect(query.exists?).to be true

          source = query.first

          expect(source.origin).to be == origin
          expect(source.reference).to be == spell
        end
      end
    end

    context 'when the spell has a source' do
      let(:spell) { spells.find { |spell| !spell.source.nil? } }

      describe 'with valid attributes' do
        let(:spell_params) do
          {
            name:         'Glowing Gaze',
            casting_time: '1 reaction, which you take when a creature within ' \
                          'range takes fire damage',
            duration:     'Instantaneous',
            level:        1,
            range:        '60 feet',
            school:       Spell::Schools::EVOCATION
          }
        end
        let(:params)        { super().merge(spell: spell_params) }
        let(:updated_spell) { Spell.where(name: 'Glowing Gaze').first }
        let(:expected_json) do
          serializer = Serializers::SpellSerializer.new

          {
            'ok'   => true,
            'data' => {
              'spell' => serializer.serialize(updated_spell)
            }
          }
        end

        it 'should respond with 200 OK' do
          call_action

          expect(response).to have_http_status(:ok)
        end

        it 'should serialize the spell' do
          call_action

          expect(json).to deep_match expected_json
        end

        it 'should update the spell' do
          call_action

          spell = Spell.find(spell_id)

          spell_params.each do |attribute, value|
            expect(spell.send attribute).to be == value
          end
        end

        it 'should delete the source', :aggregate_failures do
          expect { call_action }.to change(Source, :count).by(-1)

          query = Source.where(reference: spell)

          expect(query.exists?).to be false
        end

        include_examples 'should respond with JSON content'

        # rubocop:disable RSpec/NestedGroups
        context 'with params for a source' do
          let(:origin)        { FactoryBot.create(:book) }
          let(:source_params) { { origin_id: origin.id, origin_type: 'Book' } }
          let(:spell_params)  { super().merge(source: source_params) }

          it 'should respond with 200 OK' do
            call_action

            expect(response).to have_http_status(:ok)
          end

          it 'should create a new source', :aggregate_failures do
            expect { call_action }.not_to change(Source, :count)

            query = Source.where(reference: spell)

            expect(query.exists?).to be true

            source = query.first

            expect(source.origin).to be == origin
            expect(source.reference).to be == spell
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end

  describe 'DELETE /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:spell)    { spells.find { |spell| spell.source.nil? } }
    let(:spell_id) { spell.id }
    let(:expected_json) do
      {
        'data' => {},
        'ok'   => true
      }
    end

    def call_action
      delete "/api/spells/#{spell_id}.json", headers: headers, params: params
    end

    include_examples 'should require a valid spell id'

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should serialize the response' do
      call_action

      expect(json).to deep_match expected_json
    end

    it 'should destroy the spell', :aggregate_failures do
      expect { call_action }.to change(Spell, :count).by(-1)

      query = Spell.where(id: spell_id)

      expect(query.exists?).to be false
    end

    include_examples 'should respond with JSON content'

    context 'when the spell has a source' do
      let(:spell) { spells.find { |spell| !spell.source.nil? } }

      it 'should destroy the spell', :aggregate_failures do
        expect { call_action }.to change(Spell, :count).by(-1)

        query = Spell.where(id: spell_id)

        expect(query.exists?).to be false
      end

      it 'should delete the source', :aggregate_failures do
        expect { call_action }.to change(Source, :count).by(-1)

        query = Source.where(reference: spell)

        expect(query.exists?).to be false
      end
    end
  end
end
