# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/source_examples'

RSpec.describe Spell, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::SourceExamples

  shared_context 'when the spell has a source' do
    include_context 'when the reference has a source'
  end

  subject(:spell) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:              'The Blessing of Yevon',
      casting_time:      '1 action',
      description:       'It must be the blessing of Yevon!',
      duration:          'Instantaneous',
      level:             9,
      range:             'Self (10-foot radius)',
      school:            'abjuration',
      short_description: 'The blessing of Yevon',
      verbal_component:  true
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::References::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '::Schools' do
    let(:expected_schools) do
      {
        ABJURATION:    'abjuration',
        CONJURATION:   'conjuration',
        DIVINATION:    'divination',
        ENCHANTMENT:   'enchantment',
        EVOCATION:     'evocation',
        ILLUSION:      'illusion',
        NECROMANCY:    'necromancy',
        TRANSMUTATION: 'transmutation'
      }
    end

    include_examples 'should define immutable constant', :Schools

    it 'should enumerate the schools' do
      expect(described_class::Schools.all).to be == expected_schools
    end

    describe '::ABJURATION' do
      it 'should store the value' do
        expect(described_class::Schools::ABJURATION).to be == 'abjuration'
      end
    end

    describe '::CONJURATION' do
      it 'should store the value' do
        expect(described_class::Schools::CONJURATION).to be == 'conjuration'
      end
    end

    describe '::DIVINATION' do
      it 'should store the value' do
        expect(described_class::Schools::DIVINATION).to be == 'divination'
      end
    end

    describe '::ENCHANTMENT' do
      it 'should store the value' do
        expect(described_class::Schools::ENCHANTMENT).to be == 'enchantment'
      end
    end

    describe '::EVOCATION' do
      it 'should store the value' do
        expect(described_class::Schools::EVOCATION).to be == 'evocation'
      end
    end

    describe '::ILLUSION' do
      it 'should store the value' do
        expect(described_class::Schools::ILLUSION).to be == 'illusion'
      end
    end

    describe '::NECROMANCY' do
      it 'should store the value' do
        expect(described_class::Schools::NECROMANCY).to be == 'necromancy'
      end
    end

    describe '::TRANSMUTATION' do
      it 'should store the value' do
        expect(described_class::Schools::TRANSMUTATION).to be == 'transmutation'
      end
    end
  end

  include_examples 'should define a has_one :source association'

  describe '#cantrip?' do
    it { expect(spell).to have_predicate(:cantrip?).with_value(false) }

    context 'when the level is not set' do
      let(:attributes) { super().tap { |hsh| hsh.delete(:level) } }

      it { expect(spell.cantrip?).to be false }
    end

    context 'when the level is zero' do
      let(:attributes) { super().merge(level: 0) }

      it { expect(spell.cantrip?).to be true }
    end

    context 'when the level is greater than zero' do
      let(:attributes) { super().merge(level: 1) }

      it { expect(spell.cantrip?).to be false }
    end
  end

  describe '#casting_time' do
    include_examples 'should have attribute', :casting_time, default: ''
  end

  describe '#components' do
    it 'should define the reader' do
      expect(spell).to have_reader(:components).with_value(an_instance_of(Hash))
    end

    context 'when the spell has no components' do
      let(:attributes) do
        super().merge(
          material_component: nil,
          somatic_component:  false,
          verbal_component:   false
        )
      end

      it 'should aggregate the components' do
        expect(spell.components).to be == {
          'material' => nil,
          'somatic'  => false,
          'verbal'   => false
        }
      end
    end

    context 'when the spell has a material component' do
      let(:attributes) do
        super().merge(
          material_component: 'a blitzball, oddly enough',
          somatic_component:  false,
          verbal_component:   false
        )
      end

      it 'should aggregate the components' do
        expect(spell.components).to be == {
          'material' => attributes[:material_component],
          'somatic'  => false,
          'verbal'   => false
        }
      end
    end

    context 'when the spell has a somatic component' do
      let(:attributes) do
        super().merge(
          material_component: nil,
          somatic_component:  true,
          verbal_component:   false
        )
      end

      it 'should aggregate the components' do
        expect(spell.components).to be == {
          'material' => nil,
          'somatic'  => true,
          'verbal'   => false
        }
      end
    end

    context 'when the spell has a verbal component' do
      let(:attributes) do
        super().merge(
          material_component: nil,
          somatic_component:  false,
          verbal_component:   true
        )
      end

      it 'should aggregate the components' do
        expect(spell.components).to be == {
          'material' => nil,
          'somatic'  => false,
          'verbal'   => true
        }
      end
    end

    context 'when the spell has multiple components' do
      let(:attributes) do
        super().merge(
          material_component: 'a blitzball, oddly enough',
          somatic_component:  true,
          verbal_component:   true
        )
      end

      it 'should aggregate the components' do
        expect(spell.components).to be == {
          'material' => attributes[:material_component],
          'somatic'  => true,
          'verbal'   => true
        }
      end
    end
  end

  describe '#created_at' do
    include_examples 'should have reader', :created_at
  end

  describe '#description' do
    include_examples 'should have attribute', :description, default: ''
  end

  describe '#duration' do
    include_examples 'should have attribute', :duration, default: ''
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the spell is persisted' do
      before(:example) { spell.save! }

      it { expect(spell.id).to be_a_uuid }
    end
  end

  describe '#level' do
    include_examples 'should have attribute', :level, default: nil
  end

  describe '#material_component' do
    include_examples 'should have attribute',
      :material_component,
      default: '',
      value:   'a little bit of pixie dust'
  end

  describe '#name' do
    include_examples 'should have attribute', :name, default: ''
  end

  describe '#range' do
    include_examples 'should have attribute', :range, default: ''
  end

  describe '#ritual' do
    include_examples 'should have attribute',
      :ritual,
      default: false,
      value:   true
  end

  describe '#ritual?' do
    it { expect(spell).to have_predicate(:ritual?).with_value(false) }

    context 'when ritual is true' do
      let(:attributes) { super().merge(ritual: true) }

      it { expect(spell.ritual?).to be true }
    end
  end

  describe '#school' do
    include_examples 'should have attribute', :school, default: ''
  end

  describe '#short_description' do
    include_examples 'should have attribute', :short_description, default: ''
  end

  describe '#slug' do
    include_examples 'should have attribute',
      :slug,
      default: '',
      value:   'blessing-yevon'

    describe 'when the spell is validated' do
      let(:spell) { super().tap(&:valid?) }

      it { expect(spell.slug).to be == 'blessing-yevon' }
    end

    describe 'with a slug' do
      let(:attributes) { super().merge(slug: 'yevons-blessing') }
      let(:expected)   { attributes[:slug] }

      it { expect(spell.slug).to be == expected }

      describe 'when the spell is validated' do
        let(:spell) { super().tap(&:valid?) }

        it { expect(spell.slug).to be == expected }
      end
    end
  end

  describe '#somatic_component' do
    include_examples 'should have attribute',
      :somatic_component,
      default: false,
      value:   true
  end

  describe '#updated_at' do
    include_examples 'should have reader', :updated_at
  end

  describe '#valid?' do
    it { expect(spell).not_to have_errors }

    include_examples 'should validate the presence of',
      :casting_time,
      type: String

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of',
      :duration,
      type: String

    include_examples 'should validate the numericality of',
      :level,
      greater_than_or_equal_to: 0,
      less_than_or_equal_to:    9,
      only_integer:             true

    include_examples 'should validate the presence of', :level

    include_examples 'should validate the presence of', :material_component

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the uniqueness of',
      :name,
      attributes: {
        casting_time: '1 minute',
        description:  'Example description',
        duration:     '1 hour',
        level:        1,
        range:        'Self',
        school:       'abjuration'
      }

    include_examples 'should validate the presence of', :range

    include_examples 'should validate the presence of', :ritual

    include_examples 'should validate the inclusion of',
      :school,
      in:      described_class::Schools.all.values,
      message: 'must be abjuration, conjuration, divination, enchantment, ' \
               'evocation, illusion, necromancy, or transmutation'

    include_examples 'should validate the presence of', :school, type: String

    include_examples 'should validate the uniqueness of',
      :slug,
      attributes: {
        casting_time: '1 minute',
        description:  'Example description',
        duration:     '1 hour',
        level:        1,
        name:         'Blessing of Yevon',
        range:        'Self',
        school:       'abjuration'
      }

    include_examples 'should validate the presence of', :somatic_component

    include_examples 'should validate the presence of', :verbal_component

    context 'when the name is empty' do
      let(:attributes) { super().merge(name: nil) }

      include_examples 'should validate the presence of', :slug, type: String
    end
  end

  describe '#verbal_component' do
    include_examples 'should have attribute', :verbal_component, default: false
  end
end
