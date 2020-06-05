# frozen_string_literal: true

# A Condition represents a debilitating condition that a creature can suffer.
class Mechanics::Condition < Mechanic
  Factory = Operations::Records::Factory.new(self)

  ### Validations
  validates :name, uniqueness: true
end
