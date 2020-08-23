# frozen_string_literal: true

require 'operations/mechanics/factory'

# A Mechanic represents an abstract game mechanic.
class Mechanic < ApplicationRecord
  Factory = Operations::Mechanics::Factory.new(self)

  def self.slug_attribute
    'name'
  end

  ### Attributes
  attribute :data, :jsonb,  default: {}
  attribute :slug, :string, default: ''

  ### Validations
  validates :description,       presence: true
  validates :name,              presence: true
  validates :short_description, presence: true
  validates :slug,
    format:     {
      message: 'must be in kebab-case',
      with:    /\A[a-z0-9]+(-[a-z0-9]+)*\z/
    },
    presence:   true,
    uniqueness: { scope: :type }
end

# == Schema Information
#
# Table name: mechanics
#
#  id                :uuid             not null, primary key
#  data              :jsonb
#  description       :text             default(""), not null
#  name              :string           default(""), not null
#  notes             :text             default(""), not null
#  short_description :string           default(""), not null
#  slug              :string           default(""), not null
#  type              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
