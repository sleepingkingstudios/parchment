# frozen_string_literal: true

require 'operations/references/factory'

# A skill represents a field of mundane ability, such as Persuasion or Stealth.
class References::Skill < Reference
  self.table_name = 'skills'

  Factory = Operations::References::Factory.new(self)

  ### Validations
  validates :ability_score,
    inclusion: {
      allow_nil: true,
      in:        AbilityScores::ALL,
      message:   'must be strength, dexterity, constitution, intelligence,' \
                 ' wisdom, or charisma'
    },
    presence:  true
  validates :description, presence: true
  validates :name,
    presence:   true,
    uniqueness: true
end

# == Schema Information
#
# Table name: skills
#
#  id                :uuid             not null, primary key
#  ability_score     :string           default(""), not null
#  description       :text             default(""), not null
#  name              :string           default(""), not null
#  short_description :string           default(""), not null
#  slug              :string           default(""), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
