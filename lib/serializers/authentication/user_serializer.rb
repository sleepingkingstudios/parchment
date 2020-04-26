# frozen_string_literal: true

require 'serializers/authentication'
require 'serializers/record_serializer'

module Serializers::Authentication
  # Serializes a User as a JSON-compatible hash.
  class UserSerializer < Serializers::RecordSerializer
    attributes \
      :email_address,
      :role,
      :username

    private

    def can_serialize?(object)
      object.is_a?(Authentication::User)
    end
  end
end
