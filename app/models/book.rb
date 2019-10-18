# frozen_string_literal: true

require 'models/naming'
require 'operations/records/factory'

# Definition of a book, which is a publication which can be the source of game
# objects.
class Book < ApplicationRecord
  extend Models::Naming::Hooks

  Factory = Operations::Records::Factory.new(self)

  ### Attributes
  generate_abbreviation :name
  generate_slug         :name

  ### Validations
  validates :abbreviation,
    presence:   true,
    uniqueness: true
  validates :name,
    presence:   true,
    uniqueness: true
  validates :publication_date, presence: true
  validates :publisher_name,   presence: true
  validates :slug,
    presence:   true,
    uniqueness: true
end

# == Schema Information
#
# Table name: books
#
#  id               :uuid             not null, primary key
#  abbreviation     :string           default(""), not null
#  name             :string           default(""), not null
#  publication_date :date             not null
#  publisher_name   :string           default(""), not null
#  slug             :string           default(""), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
