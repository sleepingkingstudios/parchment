# frozen_string_literal: true

# A Credential is data that allows a User to authenticate to the system.
class Authentication::Credential < ApplicationRecord
  def self.active
    where(active: true)
  end

  def self.expired
    where('expires_at <= ?', Time.current)
  end

  def self.inactive
    where(active: false)
  end

  def self.unexpired
    where('expires_at > ?', Time.current)
  end

  ### Validations
  validates :active,
    exclusion: {
      in:      [nil],
      message: "can't be blank"
    }
  validates :expires_at, presence:  true
  validates :type,       presence:  true

  ### Associations
  belongs_to :user, class_name: 'Authentication::User'

  def expired?
    expires_at.nil? || expires_at <= Time.current
  end
end

# == Schema Information
#
# Table name: credentials
#
#  id         :uuid             not null, primary key
#  active     :boolean          default(TRUE), not null
#  data       :jsonb            not null
#  expires_at :datetime         not null
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid
#
# Indexes
#
#  index_credentials_on_user_id_and_type_and_active  (user_id,type,active)
#
