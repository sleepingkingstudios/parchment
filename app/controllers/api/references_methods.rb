# frozen_string_literal: true

# Shared functionality for controllers that process reference data.
module Api::ReferencesMethods
  PERMITTED_SOURCE_ATTRIBUTES = %i[
    origin_id
    origin_type
  ].freeze
  private_constant :PERMITTED_SOURCE_ATTRIBUTES

  private

  def extract_source
    data   = yield
    record = data.fetch(resource_name)
    source = record.source

    return success(data) if record.source.nil?

    success(data.merge('source' => source))
  end

  def extract_sources
    data    = yield
    records = Array(data.fetch(plural_resource_name))
    sources =
      records
      .reduce([]) do |ary, record|
        next ary if record.source.blank?

        ary << record.source
      end

    success(data.merge('sources' => sources))
  end

  def index_resources
    steps do
      extract_sources { step { super } }
    end
  end

  def require_resource_params
    resource_params = step { super }

    resource_params.merge(source_params)
  end

  def show_resource
    steps do
      extract_source { step { super } }
    end
  end

  def source_params
    params
      .fetch(singular_resource_name, {})
      .fetch('source', {})
      .permit(*PERMITTED_SOURCE_ATTRIBUTES)
  end
end
