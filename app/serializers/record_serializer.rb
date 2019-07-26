# frozen_string_literal: true

# Base class for serializing a record as a JSON-compatible hash.
class RecordSerializer < ApplicationSerializer
  attribute :id
end
