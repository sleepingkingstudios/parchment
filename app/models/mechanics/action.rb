# frozen_string_literal: true

# An Action represents a specific action to take during combat.
class Mechanics::Action < Mechanic
  Factory = Operations::Records::Factory.new(self)

  ### Validations
  validates :name, uniqueness: true
end
