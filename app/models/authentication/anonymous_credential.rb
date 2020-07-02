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
