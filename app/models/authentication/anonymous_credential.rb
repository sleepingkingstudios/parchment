# frozen_string_literal: true

# An AnonymousCredential wraps an anonymous user in the Credential interface.
class Authentication::AnonymousCredential < Authentication::Credential
  # Validations
  validate :user_must_be_anonymous

  private

  def user_must_be_anonymous
    return if user.nil? || user.anonymous?

    errors.add(:user, 'must be an anonymous user')
  end
end
