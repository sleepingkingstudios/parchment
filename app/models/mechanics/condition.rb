# frozen_string_literal: true

# A Condition represents a debilitating condition that a creature can suffer.
class Mechanics::Condition < Mechanic
  Factory = Operations::Mechanics::Factory.new(self)

  ### Validations
  validates :name, uniqueness: true
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
