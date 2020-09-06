# frozen_string_literal: true

require 'sleeping_king_studios/tools/toolbox/constant_map'

require 'operations/references/factory'

# A language represents a written, spoken, or signed language.
class References::Language < Reference
  self.table_name = 'languages'

  Factory = Operations::References::Factory.new(self)

  Rarity = SleepingKingStudios::Tools::Toolbox::ConstantMap.new(
    EXOTIC:   'exotic',
    STANDARD: 'standard'
  ).freeze

  ### Associations
  belongs_to :parent_language,
    class_name: 'References::Language',
    inverse_of: :dialects,
    optional:   true
  has_many :dialects,
    class_name:  'References::Language',
    foreign_key: :parent_language_id,
    inverse_of:  :parent_language

  ### Validations
  validates :name,
    presence:   true,
    uniqueness: true
  validates :rarity,
    inclusion: {
      allow_nil: true,
      in:        Rarity.all.values,
      message:   'must be standard or exotic'
    },
    presence:  true

  def exotic?
    rarity == Rarity::EXOTIC
  end

  def standard?
    rarity == Rarity::STANDARD
  end
end

# == Schema Information
#
# Table name: languages
#
#  id                 :uuid             not null, primary key
#  name               :string           default(""), not null
#  rarity             :string           default(""), not null
#  script             :string           default(""), not null
#  slug               :string           default(""), not null
#  speakers           :string           default(""), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_language_id :uuid
#
