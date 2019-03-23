# frozen_string_literal: true

# Controller for performing CRUD actions on Spells via a JSON API.
class Api::SpellsController < ApplicationController
  before_action :require_spell, only: %i[destroy show update]

  def create
    @spell = Spell.new(spell_params)

    if @spell.save
      render_json(@spell, status: :created)
    else
      render_errors(@spell.errors.entries)
    end
  end

  def destroy
    @spell.destroy

    render_json(nil)
  end

  def index
    @spells = Spell.all

    render_json(@spells)
  end

  def show
    render_json(@spell)
  end

  def update
    @spell.assign_attributes(spell_params)

    if @spell.save
      render_json(@spell)
    else
      render_errors(@spell.errors.entries)
    end
  end

  private

  def build_error_response(errors)
    {
      errors: errors,
      ok:     false
    }
  end

  def build_json_response(data)
    {
      data: data,
      ok:   true
    }
  end

  # rubocop:disable Naming/MemoizedInstanceVariableName
  def find_spell
    @spell ||= Spell.where(id: spell_id).first
  end
  # rubocop:enable Naming/MemoizedInstanceVariableName

  def not_found_errors
    [['spell', 'not found']]
  end

  def render_errors(errors, status: :unprocessable_entity)
    render json: build_error_response(errors), status: status
  end

  def render_json(data, status: :ok)
    render json: build_json_response(data), status: status
  end

  def require_spell
    return if find_spell

    render_errors(not_found_errors, status: :not_found)
  end

  def spell_id
    params[:id]
  end

  # rubocop:disable Metrics/MethodLength
  def spell_params
    params[:spell].permit(
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
    )
  end
  # rubocop:enable Metrics/MethodLength
end
