# frozen_string_literal: true

# Base controller for performing CRUD actions on Actions via a JSON API.
class Api::Mechanics::ConditionsController < Api::MechanicsController
  private

  def resource_class
    Mechanics::Condition
  end

  # @note Override the resource name because "action" is a reserved word in the
  #   parameters hash.
  def resource_params
    @resource_params ||=
      params
      .fetch('mechanic', {})
      .permit(*permitted_attributes)
      .to_hash
  end

  # @note Override the resource name because "action" is a reserved word in the
  #   parameters hash.
  def resource_params_missing_error
    Errors::InvalidParameters.new(errors: [['mechanic', "can't be blank"]])
  end
end
