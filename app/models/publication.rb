# frozen_string_literal: true

# Definition of a publication, which serves as a source for game objects.
class Publication < ApplicationRecord
  before_validation :generate_abbreviation
  before_validation :generate_slug

  validates :abbreviation,
    presence:   true,
    uniqueness: { scope: :publisher_name }
  validates :name,
    presence:   true,
    uniqueness: { scope: :publisher_name }
  validates :publication_date, presence: true
  validates :publisher_name,   presence: true
  validates :slug,
    presence:   true,
    uniqueness: { scope: :publisher_name }

  def official?
    !playtest && publisher_name == 'Wizards of the Coast'
  end

  private

  def articles
    %w[the]
  end

  def generate_abbreviation
    return unless abbreviation.blank?

    letters = /[a-z]/

    self.abbreviation =
      words_in_name
      .map { |word| word.match(letters)[0] }
      .reject(&:blank?)
      .join
  end

  def generate_slug
    return unless slug.blank?

    non_letters = /[^a-z]/

    self.slug =
      words_in_name
      .map { |word| word.gsub(non_letters, '') }
      .reject(&:blank?)
      .join('-')
  end

  def words_in_name
    return [] if name.blank?

    name
      .downcase
      .split(/\s+/)
      .reject { |word| articles.include?(word) }
  end
end
