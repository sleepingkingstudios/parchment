# frozen_string_literal: true

require 'operations/records/create_operation'
require 'operations/records/destroy_operation'
require 'operations/records/find_matching_operation'
require 'operations/records/find_one_operation'
require 'operations/records/update_operation'

# Controller for performing CRUD actions on Publications via a JSON API.
class Api::PublicationsController < Api::BaseController
  before_action :require_publication, only: %i[destroy show update]
  before_action :require_publication_params, only: %i[create update]

  def create
    create_operation.call(publication_params)

    render_operation(create_operation, status: :created)
  end

  def destroy
    destroy_operation.call(find_operation.value)

    render_json(nil)
  end

  def index
    index_operation.call

    render_operation(index_operation)
  end

  def show
    render_operation(find_operation)
  end

  def update
    update_operation.call(find_operation.value, publication_params)

    render_operation(update_operation)
  end

  private

  def create_operation
    @create_operation ||= Operations::Records::CreateOperation.new(Publication)
  end

  def destroy_operation
    @destroy_operation ||=
      Operations::Records::DestroyOperation.new(Publication)
  end

  def find_operation
    @find_operation ||= Operations::Records::FindOneOperation.new(Publication)
  end

  def index_operation
    @index_operation ||=
      Operations::Records::FindMatchingOperation.new(Publication)
  end

  def publication_id
    params[:id]
  end

  def publication_params
    @publication_params ||= params.fetch(:publication, {}).permit(
      :abbreviation,
      :name,
      :playtest,
      :publication_date,
      :publisher_name,
      :slug
    ).to_hash
  end

  def require_publication
    find_operation.call(publication_id)

    return if find_operation.success?

    render_error(find_operation.error, status: :not_found)
  end

  def require_publication_params
    return unless publication_params.empty?

    error = Errors::InvalidParameters.new(
      errors: [['publication', "can't be blank"]]
    )

    render_error(error, status: :unprocessable_entity)
  end

  def resource_name
    'publications'
  end

  def update_operation
    @update_operation ||= Operations::Records::UpdateOperation.new(Publication)
  end
end
