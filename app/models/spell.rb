# frozen_string_literal: true

require 'sleeping_king_studios/tools/toolbox/constant_map'

require 'models/naming'
require 'operations/records/spells/factory'

# Definition of a spell, which is an active ability used by certain magical
# classes and creatures.
class Spell < ApplicationRecord
  extend Models::Naming::Hooks

  Factory = Operations::Records::Spells::Factory.instance

  Schools = SleepingKingStudios::Tools::Toolbox::ConstantMap.new(
    ABJURATION:    'abjuration',
    CONJURATION:   'conjuration',
    DIVINATION:    'divination',
    ENCHANTMENT:   'enchantment',
    EVOCATION:     'evocation',
    ILLUSION:      'illusion',
    NECROMANCY:    'necromancy',
    TRANSMUTATION: 'transmutation'
  ).freeze

  ### Attributes
  attribute :name, :string, default: ''
  attribute :ritual, :boolean, default: false
  attribute :school, :string, default: ''

  attribute :material_component, :string, default: ''

  generate_slug :name

  ### Associations
  belongs_to :source,
    optional:    true,
    polymorphic: true

  ### Validations
  validates :casting_time, presence: true
  validates :description, presence: true
  validates :duration, presence: true
  validates :level,
    numericality: {
      allow_nil:                true,
      greater_than_or_equal_to: 0,
      less_than_or_equal_to:    9,
      only_integer:             true
    },
    presence:     true
  validates :material_component,
    exclusion: {
      in:      [nil],
      message: I18n.t('errors.messages.blank')
    }
  validates :name,
    presence:   true,
    uniqueness: true
  validates :ritual,
    exclusion: {
      in:      [nil],
      message: I18n.t('errors.messages.blank')
    }
  validates :range, presence: true
  validates :school,
    inclusion: {
      allow_nil: true,
      in:        Schools.all.values,
      message:   'must be abjuration, conjuration, divination, enchantment, ' \
                 'evocation, illusion, necromancy, or transmutation'
    },
    presence:  true
  validates :somatic_component,
    exclusion: {
      in:      [nil],
      message: I18n.t('errors.messages.blank')
    }
  validates :verbal_component,
    exclusion: {
      in:      [nil],
      message: I18n.t('errors.messages.blank')
    }

  def cantrip?
    level&.zero? || false
  end

  def components
    {
      'material' => material_component.presence,
      'somatic'  => somatic_component,
      'verbal'   => verbal_component
    }
  end
end
