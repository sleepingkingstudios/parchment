# frozen_string_literal: true

require 'sleeping_king_studios/tools/toolbox/constant_map'

require 'models/naming'
require 'operations/records/factory'

# Definition of a spell, which is an active ability used by certain magical
# classes and creatures.
class Spell < ApplicationRecord
  extend Models::Naming::Hooks

  Factory = Operations::Records::Factory.new(self)

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
  has_one :source, as: :reference, dependent: :destroy

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
  validates :slug,
    presence:   true,
    uniqueness: true
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

# == Schema Information
#
# Table name: spells
#
#  id                 :uuid             not null, primary key
#  casting_time       :string           default(""), not null
#  description        :string           default(""), not null
#  duration           :string           default(""), not null
#  level              :integer          not null
#  material_component :string           default(""), not null
#  name               :string           default(""), not null
#  range              :string           default(""), not null
#  ritual             :boolean          default(FALSE), not null
#  school             :string           default(""), not null
#  short_description  :string           default(""), not null
#  slug               :string           default(""), not null
#  somatic_component  :boolean          default(FALSE), not null
#  verbal_component   :boolean          default(FALSE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
