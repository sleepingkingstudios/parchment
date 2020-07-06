# frozen_string_literal: true

# Abstract base class for ActiveRecord-based origin models.
class Origin < ApplicationRecord
  self.abstract_class = true

  def self.slug_attribute
    'name'
  end
end
