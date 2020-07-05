# frozen_string_literal: true

# Abstract base class for ActiveRecord-based reference models.
class Reference < ApplicationRecord
  self.abstract_class = true

  def self.slug_attribute
    'name'
  end

  ### Associations
  has_one :source, as: :reference, dependent: :destroy

  ### Attributes
  attribute :slug, :string, default: ''

  ### Validations
  validates :slug,
    format:     {
      message: 'must be in kebab-case',
      with:    /\A[a-z0-9]+(-[a-z0-9]+)*\z/
    },
    presence:   true,
    uniqueness: true
end
