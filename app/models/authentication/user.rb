# frozen_string_literal: true

require 'sleeping_king_studios/tools/toolbox/constant_map'

require 'operations/records/factory'

# A User represents an identity used for authentication and authorization.
class Authentication::User < ApplicationRecord
  EMAIL_ADDRESS_FORMAT = /[^@]+@[^@.]+\.[^@.]+/.freeze
  private_constant :EMAIL_ADDRESS_FORMAT

  Factory = Operations::Records::Factory.new(self)

  Roles = SleepingKingStudios::Tools::Toolbox::ConstantMap.new(
    ADMIN:     'admin',
    ANONYMOUS: 'anonymous',
    USER:      'user'
  ).freeze

  def self.anonymous
    new(role: Roles::ANONYMOUS)
  end

  ### Associations
  has_many :credentials,
    class_name: 'Authentication::Credential',
    dependent:  :destroy

  ### Validations
  validates :email_address,
    format:     {
      if:   lambda do |user|
        user.email_address.is_a?(String) && !user.email_address.empty?
      end,
      with: EMAIL_ADDRESS_FORMAT
    },
    presence:   true,
    uniqueness: true
  validates :role,
    inclusion: {
      if: lambda do |user|
        user.email_address.is_a?(String) && !user.email_address.empty?
      end,
      in: [Roles::ADMIN, Roles::USER]
    },
    presence:  true
  validates :username,
    presence:   true,
    uniqueness: true

  def admin?
    role == Roles::ADMIN
  end

  def anonymous?
    role == Roles::ANONYMOUS
  end
end

# == Schema Information
#
# Table name: users
#
#  id            :uuid             not null, primary key
#  email_address :string           default(""), not null
#  role          :string           default(""), not null
#  username      :string           default(""), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_users_on_email_address  (email_address) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
