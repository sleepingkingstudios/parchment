# frozen_string_literal: true

require 'serializers'

module Serializers
  # Namespace for serializers for authentication objects.
  module Authentication
    autoload :UserSerializer, 'serializers/authentication/user_serializer'
  end
end
