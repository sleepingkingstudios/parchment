# frozen_string_literal: true

# Definition of a publication, which serves as a source for game objects.
class Publication < ApplicationRecord
  before_validation :generate_abbreviation
  before_validation :generate_slug

  attribute :playtest, :boolean, default: false

  validates :abbreviation,
    presence:   { unless: ->(publication) { publication.name.blank? } },
    uniqueness: { scope: :publisher_name }
  validates :name,
    presence:   true,
    uniqueness: { scope: :publisher_name }
  validates :publication_date, presence: true
  validates :publisher_name,   presence: true
  validates :slug,
    presence:   { unless: ->(publication) { publication.name.blank? } },
    uniqueness: { scope: :publisher_name }

  def official?
    !playtest && publisher_name == 'Wizards of the Coast'
  end

  private

  def articles
    %w[of the]
  end

  def generate_abbreviation
    return unless abbreviation.blank?

    self.abbreviation = words_in_name.map { |word| word[0] }.join
  end

  def generate_slug
    return unless slug.blank?

    self.slug = words_in_name.join('-')
  end

  def words_in_name
    return [] if name.blank?

    non_letters = /[^a-z]/

    name
      .downcase
      .split(/\s+/)
      .reject { |word| articles.include?(word) }
      .map { |word| word.gsub(non_letters, '') }
      .reject(&:blank?)
  end
end
