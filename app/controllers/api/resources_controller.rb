# frozen_string_literal: true

require 'responders/json_responder'

# rubocop:disable Metrics/ClassLength
module Api
  # Abstract base class for API resource controllers that delegate their actions
  # to pre-defined operations.
  class ResourcesController < Api::BaseController
    SORT_DIRECTIONS = {
      'asc'        => 'asc',
      'ascending'  => 'asc',
      'desc'       => 'desc',
      'descending' => 'desc'
    }.freeze
    private_constant :SORT_DIRECTIONS

    def create
      responder.call(create_resource, action: :create, status: :created)
    end

    def destroy
      responder.call(destroy_resource, action: :destroy)
    end

    def index
      responder.call(index_resources, action: :index)
    end

    def show
      responder.call(show_resource, action: :show)
    end

    def update
      responder.call(update_resource, action: :update)
    end

    private

    def create_resource
      create_operation = operation_factory.create

      steps do
        attributes = step :require_resource_params
        resource   = step create_operation.call(attributes)

        { resource_name => resource }
      end
    end

    def default_order
      {}
    end

    def destroy_resource
      find_operation    = operation_factory.find_one
      destroy_operation = operation_factory.destroy

      steps do
        resource = step find_operation.call(resource_id)

        step destroy_operation.call(resource)

        {}
      end
    end

    def index_params
      @index_params ||=
        params
        .permit(:order)
        .to_hash
    end

    def index_order
      index_params.fetch('order', default_order)
    end

    def index_resources
      find_operation = operation_factory.find_matching

      steps do
        order     = step :normalize_sort, index_order
        resources = step find_operation.call(order: order)

        { plural_resource_name => resources }
      end
    end

    def invalid_order_result
      error = Errors::InvalidParameters.new(errors: [['order', 'is invalid']])

      Cuprum::Result.new(error: error)
    end

    def normalize_sort(order)
      return {} if order.nil?

      return order if order.is_a?(Hash)

      return invalid_order_result unless order.is_a?(String)

      order.split('::').each.with_object({}) do |str, hsh|
        key, dir = str.split(':')

        dir = SORT_DIRECTIONS.fetch(dir, nil)

        return invalid_order_result if key.blank? || dir.blank?

        hsh[key] = dir
      end
    end

    def operation_factory
      resource_class::Factory
    end

    def permitted_attributes
      []
    end

    def plural_resource_name
      resource_name.pluralize
    end

    def require_resource_params
      return resource_params unless resource_params.empty?

      error =
        if permitted_attributes.empty?
          Cuprum::Error
            .new(message: 'No attributes are permitted for the current action')
        else
          Errors::InvalidParameters
            .new(errors: [[resource_name, "can't be blank"]])
        end

      Cuprum::Result.new(error: error)
    end

    def resource_id
      params[:id]
    end

    def resource_name
      @resource_name ||= resource_class.name.split('::').last.underscore
    end

    def resource_params
      @resource_params ||=
        params
        .fetch(singular_resource_name, {})
        .permit(*permitted_attributes)
        .to_hash
    end

    def show_resource
      find_operation = operation_factory.find_one

      steps do
        resource = step find_operation.call(resource_id)

        { resource_name => resource }
      end
    end

    def singular_resource_name
      resource_name.singularize
    end

    def update_resource
      find_operation   = operation_factory.find_one
      update_operation = operation_factory.update

      steps do
        attributes = step :require_resource_params
        resource   = step find_operation.call(resource_id)
        resource   = step update_operation.call(resource, attributes)

        { resource_name => resource }
      end
    end
  end
end
# rubocop:enable Metrics/ClassLength
