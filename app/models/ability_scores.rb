# frozen_string_literal: true

# Defines ability score constants.
#
# Every creature has values for each of the six ability scores. In addition,
# many other game mechanics either modify or use a creature or character's
# ability score values.
module AbilityScores
  extend Enumerable

  CHARISMA     = 'charisma'
  CONSTITUTION = 'constitution'
  DEXTERITY    = 'dexterity'
  INTELLIGENCE = 'intelligence'
  STRENGTH     = 'strength'
  WISDOM       = 'wisdom'

  ALL = [
    STRENGTH,
    DEXTERITY,
    CONSTITUTION,
    INTELLIGENCE,
    WISDOM,
    CHARISMA
  ].freeze

  def self.each
    return ALL.each unless block_given?

    ALL.each { |item| yield item }
  end
end
