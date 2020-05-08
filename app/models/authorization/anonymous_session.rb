# frozen_string_literal: true

# An anonymous Session represents the case with no authenticated User.
class Authorization::AnonymousSession < Authorization::Session
  def initialize(expires_at: nil)
    super(credential: create_anonymous_credential, expires_at: expires_at)
  end

  private

  def create_anonymous_credential
    user = Authentication::User.anonymous

    Authentication::AnonymousCredential.new(
      active:     true,
      expires_at: 1.year.from_now,
      user:       user
    )
  end

  def validate_credential(_credential)
    nil
  end
end
