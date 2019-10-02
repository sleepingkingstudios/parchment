# frozen_string_literal: true

require 'models/naming'
require 'operations/records/factory'

# Definition of a publication, which serves as a source for game objects.
class Publication < ApplicationRecord
  extend Models::Naming::Hooks

  Factory = Operations::Records::Factory.new(self)

  ### Attributes
  attribute :abbreviation, :string,  default: ''
  attribute :playtest,     :boolean, default: false
  attribute :slug,         :string,  default: ''

  generate_abbreviation :name
  generate_slug :name

  ### Associations
  has_many :spells, as: :source

  ### Validations
  validates :abbreviation,
    presence:   { unless: ->(publication) { publication.name.blank? } },
    uniqueness: { scope: :publisher_name }
  validates :name,
    presence:   true,
    uniqueness: { scope: :publisher_name }
  validates :publication_date, presence: true
  validates :publisher_name,   presence: true
  validates :slug,
    presence:   { unless: ->(publication) { publication.name.blank? } },
    uniqueness: { scope: :publisher_name }

  def official?
    !playtest && publisher_name == 'Wizards of the Coast'
  end
end

# == Schema Information
#
# Table name: publications
#
#  id               :uuid             not null, primary key
#  abbreviation     :string           not null
#  name             :string           default(""), not null
#  playtest         :boolean          not null
#  publication_date :date             not null
#  publisher_name   :string           default(""), not null
#  slug             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
