# frozen_string_literal: true

require 'operations/records/factory'

# Definition of a Source, which maps a domain object, such as a Spell or a Feat
# (the #reference) to where the domain object is defined, such as an Article in
# a periodical, a Book, or a Website (the #origin).
class Source < ApplicationRecord
  ORIGIN_TYPES = %w[
    Book
  ].freeze

  REFERENCE_TYPES = %w[
    References::Item
    References::Language
    References::Skill
    Spell
  ].freeze

  SOURCE_NOT_UNIQUE_MESSAGE = 'already has a source'
  private_constant :SOURCE_NOT_UNIQUE_MESSAGE

  Factory = Operations::Records::Factory.new(self)

  ### Attributes
  attribute :metadata, :jsonb, default: {}

  ### Associations
  belongs_to :origin,    polymorphic: true
  belongs_to :reference, polymorphic: true

  ### Validations
  validates :name, presence: true
  validates :reference_type,
    uniqueness: {
      message: SOURCE_NOT_UNIQUE_MESSAGE,
      scope:   :reference_id
    }

  after_validation do
    next unless errors.key?(:reference_type)

    next unless errors[:reference_type].delete(SOURCE_NOT_UNIQUE_MESSAGE)

    errors.add(:reference, SOURCE_NOT_UNIQUE_MESSAGE)

    errors.delete(:reference_type) if errors[:reference_type].empty?
  end

  def name
    metadata['name']
  end

  def name=(value)
    metadata['name'] = value
  end

  def playtest
    metadata['playtest']
  end

  def playtest=(value)
    metadata['playtest'] = value
  end

  def playtest?
    playtest ? true : false
  end
end

# == Schema Information
#
# Table name: sources
#
#  id             :uuid             not null, primary key
#  metadata       :jsonb
#  origin_type    :string
#  reference_type :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  origin_id      :uuid
#  reference_id   :uuid
#
# Indexes
#
#  index_sources_on_origin_type_and_origin_id        (origin_type,origin_id)
#  index_sources_on_reference_type_and_reference_id  (reference_type,reference_id) UNIQUE
#
