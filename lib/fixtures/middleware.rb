# frozen_string_literal: true

require 'fixtures'

module Fixtures
  # Namespace for fixture middleware, which creates a chain of transformations
  # on fixture data and the generated record(s), if any.
  module Middleware
    autoload :Builder,     'fixtures/middleware/builder'
    autoload :FormatText,  'fixtures/middleware/format_text'
    autoload :SetPassword, 'fixtures/middleware/set_password'
    autoload :SetSource,   'fixtures/middleware/set_source'
  end
end
