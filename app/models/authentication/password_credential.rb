# frozen_string_literal: true

# A PasswordCredential wraps a users encrypted password.
class Authentication::PasswordCredential < Authentication::Credential
  ### Validations
  validates :encrypted_password, presence: true

  def encrypted_password
    data['encrypted_password']
  end

  def encrypted_password=(value)
    data['encrypted_password'] = value
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
