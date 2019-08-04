# frozen_string_literal: true

require 'errors/not_found'
require 'operations/records/create_operation'
require 'operations/records/destroy_operation'
require 'operations/records/find_one_operation'
require 'operations/records/update_operation'
require 'operations/spells/find_matching_operation'

# rubocop:disable Metrics/ClassLength

# Controller for performing CRUD actions on Spells via a JSON API.
class Api::SpellsController < Api::BaseController
  before_action :require_spell, only: %i[destroy show update]
  before_action :require_spell_params, only: %i[create update]

  def create
    create_operation.call(spell_params)

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
    update_operation.call(find_operation.value, spell_params)

    render_operation(update_operation)
  end

  private

  def build_error_response(errors)
    {
      errors: serialize_error(errors),
      ok:     false
    }
  end

  def build_json_response(data)
    {
      data: data,
      ok:   true
    }
  end

  def create_operation
    @create_operation ||= Operations::Records::CreateOperation.new(Spell)
  end

  def destroy_operation
    @destroy_operation ||= Operations::Records::DestroyOperation.new(Spell)
  end

  def find_operation
    @find_operation ||= Operations::Records::FindOneOperation.new(Spell)
  end

  def index_operation
    @index_operation ||= Operations::Spells::FindMatchingOperation.new
  end

  def render_errors(errors, status: :unprocessable_entity)
    render json: build_error_response(errors), status: status
  end

  def render_json(data, status: :ok)
    render json: build_json_response(data), status: status
  end

  def render_operation(operation, status: :ok)
    if operation.success?
      render_json(wrap_value(operation.value), status: status)
    else
      render_errors(operation.error, status: :unprocessable_entity)
    end
  end

  def require_spell
    find_operation.call(spell_id)

    return if find_operation.success?

    render_errors(find_operation.error, status: :not_found)
  end

  def require_spell_params
    return unless spell_params.empty?

    render_errors([['spell', "can't be blank"]], status: :unprocessable_entity)
  end

  def resource_name
    'spells'
  end

  def serialize_error(error)
    case error
    when Errors::NotFound
      error.as_json
    when Cuprum::Error
      # :nocov:
      { 'message' => 'Something went wrong when processing the request.' }
      # :nocov:
    else
      error.as_json
    end
  end

  def spell_id
    params[:id]
  end

  # rubocop:disable Metrics/MethodLength
  def spell_params
    @spell_params ||= params.fetch(:spell, {}).permit(
      :casting_time,
      :description,
      :duration,
      :level,
      :material_component,
      :name,
      :range,
      :ritual,
      :school,
      :somatic_component,
      :verbal_component
    ).to_hash
  end
  # rubocop:enable Metrics/MethodLength

  def update_operation
    @update_operation ||= Operations::Records::UpdateOperation.new(Spell)
  end

  def wrap_value(value)
    if value.is_a?(Array)
      { resource_name => value.map { |item| serialize(item) } }
    else
      { resource_name.singularize => serialize(value) }
    end
  end
end
# rubocop:enable Metrics/ClassLength
