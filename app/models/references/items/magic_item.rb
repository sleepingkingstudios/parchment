# frozen_string_literal: true

require 'sleeping_king_studios/tools/toolbox/constant_map'

# A MagicItem has a type and rarity, but usually no fixed cost.
class References::Items::MagicItem < References::Item
  Categories = SleepingKingStudios::Tools::Toolbox::ConstantMap.new(
    ARMOR:         'armor',
    POTION:        'potion',
    RING:          'ring',
    ROD:           'rod',
    SCROLL:        'scroll',
    STAFF:         'staff',
    WAND:          'wand',
    WEAPON:        'weapon',
    WONDROUS_ITEM: 'wondrous item'
  ).freeze

  Factory = Operations::References::Factory.new(self)

  Rarities = SleepingKingStudios::Tools::Toolbox::ConstantMap.new(
    COMMON:    'common',
    UNCOMMON:  'uncommon',
    RARE:      'rare',
    VERY_RARE: 'very rare',
    LEGENDARY: 'legendary',
    ARTIFACT:  'artifact'
  ).freeze

  DEFAULT_COST_BY_RARITY = {
    Rarities::COMMON    => '50-100 gp',
    Rarities::UNCOMMON  => '101-500 gp',
    Rarities::RARE      => '501-5,000 gp',
    Rarities::VERY_RARE => '5,001-50,000 gp',
    Rarities::LEGENDARY => '50,001+ gp',
    Rarities::ARTIFACT  => 'Priceless'
  }.freeze
  private_constant :DEFAULT_COST_BY_RARITY

  before_validation :assign_default_cost

  ### Attributes

  data_attribute :category
  data_attribute :rarity

  ### Validations
  validates :category,
    inclusion: {
      allow_nil: true,
      in:        Categories.values,
      message:   'must be Armor, Potion, Ring, Rod, Scroll, Staff, Wand,' \
                 ' Weapon, or Wondrous Item'
    },
    presence:  true
  validates :rarity,
    inclusion: {
      allow_nil: true,
      in:        Rarities.values,
      message:   'must be Common, Uncommon, Rare, Very Rare, Legendary, or' \
                 ' Artifact'
    },
    presence:  true

  private

  def assign_default_cost
    return unless cost.blank?

    self.cost = DEFAULT_COST_BY_RARITY.fetch(rarity, '')
  end
end
