# frozen_string_literal: true

# Abstract base class for ActiveRecord-based reference models.
class Reference < ApplicationRecord
  self.abstract_class = true

  def self.slug_attribute
    'name'
  end

  ### Attributes
  attribute :slug, :string, default: ''

  ### Associations
  has_one :source, as: :reference, dependent: :destroy

  ### Validations
  validates :slug,
    format:     {
      message: 'must be in kebab-case',
      with:    /\A[a-z0-9]+(-[a-z0-9]+)*\z/
    },
    presence:   true,
    uniqueness: true
end
