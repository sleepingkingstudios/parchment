# frozen_string_literal: true

# Abstract base class for ActiveRecord-based reference models.
class Reference < ApplicationRecord
  self.abstract_class = true

  def self.slug_attribute
    'name'
  end
end
