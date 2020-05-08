# frozen_string_literal: true

require 'forwardable'

require 'errors/authentication/base'
require 'errors/authentication/failed_login'
require 'errors/failed_validation'
require 'errors/invalid_parameters'
require 'errors/not_found'
require 'responders'

module Responders
  # Abstract base class for accepting a passing or failing Result and generating
  # a server response.
  class BaseResponder
    extend Forwardable

    # Maps the type of error to the HTTP status of the response.
    ERROR_STATUSES = {
      Errors::Authentication::FailedLogin => :forbidden,
      Errors::Authentication::Base        => :unauthorized,
      Errors::FailedValidation            => :unprocessable_entity,
      Errors::InvalidParameters           => :bad_request,
      Errors::NotFound                    => :not_found
    }.freeze

    def_delegators :@controller,
      :head,
      :render

    # @param controller [ActionController::Base] The controller instance to
    #   handle the generated response.
    def initialize(controller)
      @controller = controller
    end

    # @return [ActionController::Base] the controller instance to handle the
    #   generated response.
    attr_reader :controller

    # @return [Hash] the options provided to #call.
    attr_reader :options

    def call(result, **options)
      @options = options

      result.success? ? respond_to_success(result) : respond_to_failure(result)
    end

    private

    def controller_name
      controller.class.name
    end

    def error_status(error)
      ERROR_STATUSES.each do |error_class, status|
        return status if error.is_a?(error_class)
      end

      :internal_server_error
    end

    def respond_to_failure(result)
      head error_status(result.error)
    end

    def respond_to_success(_result)
      head options.fetch(:status, :ok)
    end
  end
end
