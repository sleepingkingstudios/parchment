# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/create_operation'

RSpec.describe Operations::Records::CreateOperation do
  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { nil }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { call_operation.value }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(0..1).arguments }

    describe 'with no arguments' do
      def call_operation
        operation.call
      end

      let(:expected_errors) do
        [
          [
            'casting_time',
            "can't be blank"
          ],
          [
            'description',
            "can't be blank"
          ],
          [
            'duration',
            "can't be blank"
          ],
          [
            'level',
            "can't be blank"
          ],
          [
            'name',
            "can't be blank"
          ],
          [
            'range',
            "can't be blank"
          ],
          [
            'school',
            "can't be blank"
          ]
        ]
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end

      it { expect { call_operation }.not_to change(Spell, :count) }
    end

    describe 'with nil' do
      let(:attributes)      { nil }
      let(:expected_errors) { ['attributes', 'must be a Hash'] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(expected_errors)
      end
    end

    describe 'with an Object' do
      let(:attributes)      { Object.new }
      let(:expected_errors) { [['attributes', 'must be a Hash']] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end
    end

    describe 'with an empty hash' do
      let(:attributes) { {} }
      let(:expected_errors) do
        [
          [
            'casting_time',
            "can't be blank"
          ],
          [
            'description',
            "can't be blank"
          ],
          [
            'duration',
            "can't be blank"
          ],
          [
            'level',
            "can't be blank"
          ],
          [
            'name',
            "can't be blank"
          ],
          [
            'range',
            "can't be blank"
          ],
          [
            'school',
            "can't be blank"
          ]
        ]
      end

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end

      it { expect { call_operation }.not_to change(Spell, :count) }
    end

    describe 'with a hash with invalid attributes' do
      let(:attributes) do
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

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end

      it { expect { call_operation }.not_to change(Spell, :count) }
    end

    describe 'with a hash with unknown attributes' do
      let(:attributes) do
        {
          name:         'Glowing Gaze',
          casting_time: '1 reaction, which you take when a creature within ' \
                        'range takes fire damage',
          duration:     'Instantaneous',
          level:        1,
          range:        '60 feet',
          school:       Spell::Schools::EVOCATION,
          difficulty:   'high',
          element:      'radiance',
          explosion:    'megacolossal',
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
      let(:expected_errors) { [['difficulty', 'unknown attribute']] }

      it 'should have a failing result' do
        expect(call_operation)
          .to have_failing_result.with_errors(*expected_errors)
      end

      it { expect { call_operation }.not_to change(Spell, :count) }
    end

    describe 'with a hash with valid attributes' do
      let(:attributes) do
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
      let(:expected) do
        super()
          .merge(attributes.stringify_keys)
          .merge(
            'id'         => a_uuid,
            'created_at' => an_instance_of(ActiveSupport::TimeWithZone),
            'updated_at' => an_instance_of(ActiveSupport::TimeWithZone)
          )
      end

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }

      it { expect(record.persisted?).to be true }

      it { expect { call_operation }.to change(Spell, :count).by(1) }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
