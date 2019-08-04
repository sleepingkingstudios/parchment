# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/save_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::SaveOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { {} }
    let(:record)     { record_class.new(attributes) }

    def call_operation
      operation.call(record)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should validate the record'

    describe 'with a record with invalid attributes' do
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
          .to have_failing_result.with_error(expected_errors)
      end

      it { expect { call_operation }.not_to change(record, :persisted?) }
    end

    describe 'with a record with valid attributes' do
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

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it { expect { call_operation }.to change(record, :persisted?).to be true }
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
