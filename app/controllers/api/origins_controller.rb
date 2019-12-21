# frozen_string_literal: true

require 'operations/sources/find_all_origins_operation'

# Controller for requesting the available origins for a referenced object.
class Api::OriginsController < Api::ResourcesController
  private

  def index_resources
    Operations::Sources::FindAllOriginsOperation.new.call
  end
end
