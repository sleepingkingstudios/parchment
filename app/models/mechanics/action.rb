# frozen_string_literal: true

# An Action represents a specific action to take during combat.
class Mechanics::Action < Mechanic
  Factory = Operations::Records::Factory.new(self)

  ### Validations
  validates :name, uniqueness: true
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
