# frozen_string_literal: true

require 'errors/sources'

module Errors::Sources
  # Cuprum error for an invalid reference argument to a Source.
  class InvalidReference < Cuprum::Error
    # Short string used to identify the type of error.
    TYPE = 'sources.invalid_reference'

    def initialize
      expected_types = tools.array_tools.humanize_list(Source::REFERENCE_TYPES)

      super(message: "Source reference should be one of: #{expected_types}")
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
