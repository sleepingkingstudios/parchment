# frozen_string_literal: true

require 'errors/authentication/invalid_header'
require 'errors/authentication/invalid_token'
require 'errors/authentication/missing_token'
require 'errors/invalid_headers'
require 'operations/authentication'

module Operations::Authentication
  # Operation to extract the HTTP Authorization header from the headers object.
  class ExtractHeader < Cuprum::Operation
    private

    def extract_header(headers = {})
      key = headers.each_key.find do |header|
        header.casecmp('http_authorization').zero?
      end
      value = headers[key]

      return value unless value.blank?

      failure(Errors::Authentication::MissingToken.new)
    end

    def extract_token(header_value)
      scheme, token, *rest = header_value.split(' ')

      return token if scheme_valid?(scheme) && !token.blank? && rest.empty?

      failure(Errors::Authentication::InvalidHeader.new(header: header_value))
    end

    def process(headers = {})
      step { validate_headers(headers) }

      header_value = step { extract_header(headers) }

      step { extract_token(header_value) }
    end

    def scheme_valid?(scheme)
      scheme.is_a?(String) && scheme.casecmp('bearer').zero?
    end

    def validate_headers(headers = {})
      return if headers.is_a?(Hash)

      failure(Errors::InvalidHeaders.new)
    end
  end
end
