# frozen_string_literal: true

unless defined?(ActionMailer)
  module ActionMailer
    module Base
      # rubocop:disable Naming/UncommunicativeMethodParamName
      def self.deliveries=(_); end
      # rubocop:enable Naming/UncommunicativeMethodParamName
    end
  end
end
