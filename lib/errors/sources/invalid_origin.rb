# frozen_string_literal: true

require 'rails_helper'

require 'errors/sources'

module Errors::Sources
  # Cuprum error for an invalid origin argument to a Source.
  class InvalidOrigin < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'sources.invalid_origin'

    def initialize
      expected_types = tools.array.humanize_list(Source::ORIGIN_TYPES)

      super(message: "Source origin should be one of: #{expected_types}")
    end

    # @return [Hash] a serializable hash representation of the error.
    def as_json
      {
        'message' => message,
        'type'    => type
      }
    end

    # @return [String] short string used to identify the type of error.
    def type
      TYPE
    end

    private

    def tools
      SleepingKingStudios::Tools::Toolbelt.instance
    end
  end
end
