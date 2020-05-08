# frozen_string_literal: true

# A Session encapsulates a user authorization.
class Authorization::Session
  extend Forwardable

  def initialize(credential:, expires_at: nil)
    validate_credential(credential)
    validate_expires_at(expires_at)

    @credential = credential
    @expires_at = expires_at
  end

  attr_reader :credential

  def_delegators :@credential,
    :active,
    :active?,
    :user

  def_delegators :user,
    :admin?,
    :anonymous?,
    :role

  def expired?
    expires_at <= Time.current
  end

  def expires_at
    return credential.expires_at unless @expires_at

    if credential.expires_at.to_i < @expires_at.to_i
      return credential.expires_at
    end

    @expires_at
  end

  def valid?
    active? && !expired?
  end

  private

  def validate_credential(credential)
    unless credential.is_a?(Authentication::Credential)
      raise ArgumentError, 'credential must be an Authentication::Credential'
    end

    return if credential.persisted?

    raise ArgumentError, 'credential must be persisted'
  end

  def validate_expires_at(expires_at)
    return if expires_at.nil?

    return if [ActiveSupport::TimeWithZone, Date, DateTime, Time].any? do |type|
      expires_at.is_a?(type)
    end

    raise ArgumentError, 'expires_at must be a date or time'
  end
end
