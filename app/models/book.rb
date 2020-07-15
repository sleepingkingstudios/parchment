# frozen_string_literal: true

require 'models/naming'
require 'operations/origins/factory'

# Definition of a book, which is a publication which can be the source of game
# objects.
class Book < Origin
  extend Models::Naming::Hooks

  Factory = Operations::Origins::Factory.new(self)

  def self.slug_attribute
    'title'
  end

  ### Attributes
  generate_abbreviation :title

  ### Validations
  validates :abbreviation,
    presence:   true,
    uniqueness: true
  validates :title,
    presence:   true,
    uniqueness: true
  validates :publication_date, presence: true
  validates :publisher_name,   presence: true
end

# == Schema Information
#
# Table name: books
#
#  id               :uuid             not null, primary key
#  abbreviation     :string           default(""), not null
#  playtest         :boolean          default(FALSE), not null
#  publication_date :date             not null
#  publisher_name   :string           default(""), not null
#  slug             :string           default(""), not null
#  title            :string           default(""), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
