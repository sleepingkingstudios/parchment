# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::SpellsController do
  shared_context 'when there are many spells' do
    let(:spells_data) do
      [
        {
          id:           'e17bca01-24d3-48d3-a308-099dd6dca373',
          name:         'Embers',
          casting_time: '1 action',
          duration:     'Instantaneous',
          level:        0,
          range:        '30 feet',
          school:       Spell::Schools::EVOCATION,
          description:  <<~DESCRIPTION
            You spit a handful of burning embers at a foe. Make a ranged spell
            attack against the target. On a hit, the target takes 1d4 fire
            damage, or 2d4 fire damage if the target is prone. On a miss, the
            target takes 1 fire damage.
          DESCRIPTION
        },
        {
          id:           'e3641970-fc98-4674-b873-5532d89d9f26',
          name:         "Dragon's Breath",
          casting_time: '1 action',
          duration:     'Instantaneous',
          level:        3,
          range:        'Self (60-foot line)',
          school:       Spell::Schools::EVOCATION,
          description:  <<~DESCRIPTION
            A burst of elemental flame erupts from your maw with a primal
            scream. Each creature in a line 60 feet long and 10 feet wide must
            make a Dexterity saving throw. A target takes 8d6 fire damage on a
            failed save, or half as much damage on a successful one.

            The fire ignites flammable objects in the area that aren't being
            worn or carried.

            **At Higher Levels:** When you cast this spell using a spell slot of
            4th level or higher, the damage increases by 1d6 for each slot level
            above 3rd.
          DESCRIPTION
        },
        {
          id:                 'a74d8c21-607d-4a3f-8cfd-2bbb48ec196a',
          name:               'Wrath of the Titans',
          casting_time:       '1 minute',
          duration:           'Concentration, up to 1 minute',
          level:              9,
          material_component: 'a vial of primordial fire',
          range:              '1 mile (60-foot circle)',
          school:             Spell::Schools::EVOCATION,
          somatic_component:  true,
          verbal_component:   true,
          description:        <<~DESCRIPTION
            "I call upon the primordial flames from which all was born and to
            which all will return! For Surtr! For Muspelheimr! From the ashes
            off Yggdrasil, a new world shall rise!"

            Invoking the ancient and primordial powers of flame, you conjure
            forth the very fires of creation itself. Each creature that starts
            its turn in a 60-foot-radius sphere centered on the point you choose
            must make a Dexterity saving throw. A target takes 10d6 fire damage
            and 10d6 radiant damage on a failed save, or half as much damage on
            a successful save. The sphere spreads around corners and ignites
            flammable objects in the area that aren't being worn or carried.
          DESCRIPTION
        }
      ]
    end
    let!(:spells) do
      spells_data.map { |data| Spell.create!(data) }
    end
  end

  shared_examples 'should require a valid spell id' do
    describe 'with an invalid spell id' do
      let(:spell_id) { '00000000-0000-0000-0000-000000000000' }
      let(:expected_errors) do
        [
          [
            'spell',
            'not found'
          ]
        ]
      end
      let(:expected_json) do
        {
          'errors' => expected_errors,
          'ok'     => false
        }
      end

      it 'should respond with 404 Not Found' do
        call_action

        expect(response).to have_http_status(:not_found)
      end

      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json'
      end

      it 'should serialize the spells' do
        call_action

        expect(json).to be == expected_json
      end
    end
  end

  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:params)  { {} }
  let(:json)    { JSON.parse(response.body) }

  describe 'GET /api/spells.json' do
    let(:expected_data) { [] }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'spells' => expected_data
        }
      }
    end

    def call_action
      get '/api/spells.json', headers: headers, params: params
    end

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should respond with JSON content' do
      call_action

      expect(response.content_type).to be == 'application/json'
    end

    it 'should serialize the spells' do
      call_action

      expect(json).to be == expected_json
    end

    context 'when there are many spells' do
      include_context 'when there are many spells'

      let(:expected_data) { spells.map(&:as_json) }

      it 'should serialize the spells' do
        call_action

        expect(json).to be == expected_json
      end
    end
  end

  describe 'POST /api/spells.json' do
    let(:params)       { super().merge(spell: spell_params) }
    let(:spell_params) { {} }

    def call_action
      post '/api/spells.json', headers: headers, params: params
    end

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
      let(:expected_errors) do
        [
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
        ]
      end
      let(:expected_json) do
        {
          'ok'     => false,
          'errors' => expected_errors
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json'
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to be == expected_json
      end

      # rubocop:disable RSpec/MultipleExpectations
      it 'should not create the spell' do
        expect { call_action }.not_to change(Spell, :count)

        query = Spell.where(name: spell_params[:name])

        expect(query.exists?).to be false
      end
      # rubocop:enable RSpec/MultipleExpectations
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
          school:       Spell::Schools::EVOCATION,
          description:  <<~DESCRIPTION
            Your eyes glow with an inner fire. The target creature must make a
            Dexterity saving throw. A target takes 2d6 fire damage on a failed
            save, or half as much damage on a successful one.

            **At Higher Levels:** When you cast this spell using a spell slot of
            2nd level or higher, the damage increases by 1d6 for each slot level
            above 1st.
          DESCRIPTION
        }
      end
      let(:params)        { super().merge(spell: spell_params) }
      let(:created_spell) { Spell.where(name: 'Glowing Gaze').first }
      let(:expected_data) { created_spell.as_json }
      let(:expected_json) do
        {
          'ok'   => true,
          'data' => {
            'spell' => expected_data
          }
        }
      end

      it 'should respond with 201 Created' do
        call_action

        expect(response).to have_http_status(:created)
      end

      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json'
      end

      it 'should serialize the spell' do
        call_action

        expect(json).to be == expected_json
      end

      # rubocop:disable RSpec/ExampleLength
      # rubocop:disable RSpec/MultipleExpectations
      it 'should create the spell' do
        expect { call_action }.to change(Spell, :count).by(1)

        query = Spell.where(name: spell_params[:name])

        expect(query.exists?).to be true

        spell = query.first

        spell_params.each do |attribute, value|
          expect(spell.send attribute).to be == value
        end
      end
      # rubocop:enable RSpec/ExampleLength
      # rubocop:enable RSpec/MultipleExpectations
    end
  end

  describe 'GET /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:spell)         { spells.first }
    let(:spell_id)      { spell.id }
    let(:expected_data) { spell.as_json }
    let(:expected_json) do
      {
        'ok'   => true,
        'data' => {
          'spell' => expected_data
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

    it 'should respond with JSON content' do
      call_action

      expect(response.content_type).to be == 'application/json'
    end

    it 'should serialize the spells' do
      call_action

      expect(json).to be == expected_json
    end
  end

  describe 'PATCH /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:params)       { super().merge(spell: spell_params) }
    let(:spell)        { spells.first }
    let(:spell_id)     { spell.id }
    let(:spell_params) { {} }

    def call_action
      patch "/api/spells/#{spell_id}.json", headers: headers, params: params
    end

    include_examples 'should require a valid spell id'

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
      let(:expected_errors) do
        [
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
        ]
      end
      let(:expected_json) do
        {
          'ok'     => false,
          'errors' => expected_errors
        }
      end

      it 'should respond with 422 Unprocessable Entity' do
        call_action

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json'
      end

      it 'should serialize the errors' do
        call_action

        expect(json).to be == expected_json
      end

      it 'should not update the spell' do
        call_action

        spell = Spell.find(spell_id)

        spell_params.each do |attribute, value|
          expect(spell.send attribute).not_to be == value
        end
      end
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
      let(:expected_data) { updated_spell.as_json }
      let(:expected_json) do
        {
          'ok'   => true,
          'data' => {
            'spell' => expected_data
          }
        }
      end

      it 'should respond with 200 OK' do
        call_action

        expect(response).to have_http_status(:ok)
      end

      it 'should respond with JSON content' do
        call_action

        expect(response.content_type).to be == 'application/json'
      end

      it 'should serialize the spell' do
        call_action

        expect(json).to be == expected_json
      end

      it 'should update the spell' do
        call_action

        spell = Spell.find(spell_id)

        spell_params.each do |attribute, value|
          expect(spell.send attribute).to be == value
        end
      end
    end
  end

  describe 'DELETE /api/spells/:id.json' do
    include_context 'when there are many spells'

    let(:spell)    { spells.first }
    let(:spell_id) { spell.id }
    let(:expected_json) do
      {
        'data' => nil,
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

    it 'should respond with JSON content' do
      call_action

      expect(response.content_type).to be == 'application/json'
    end

    it 'should serialize the spells' do
      call_action

      expect(json).to be == expected_json
    end

    # rubocop:disable RSpec/MultipleExpectations
    it 'should destroy the spell' do
      expect { call_action }.to change(Spell, :count).by(-1)

      query = Spell.where(id: spell_id)

      expect(query.exists?).to be false
    end
    # rubocop:enable RSpec/MultipleExpectations
  end
end
