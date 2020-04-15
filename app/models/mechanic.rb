# frozen_string_literal: true

require 'operations/records/factory'

# A Mechanic represents an abstract game mechanic.
class Mechanic < ApplicationRecord
  Factory = Operations::Records::Factory.new(self)

  ### Validations
  validates :description,       presence: true
  validates :name,              presence: true
  validates :short_description, presence: true
end

# == Schema Information
#
# Table name: mechanics
#
#  id                :uuid             not null, primary key
#  description       :text             default(""), not null
#  name              :string           default(""), not null
#  notes             :text             default(""), not null
#  short_description :string           default(""), not null
#  type              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
