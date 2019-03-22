# frozen_string_literal: true

# Abstract base class for ActiveRecord-based models.
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
