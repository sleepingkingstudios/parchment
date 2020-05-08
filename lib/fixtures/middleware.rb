# frozen_string_literal: true

require 'fixtures'

module Fixtures
  # Namespace for fixture middleware, which creates a chain of transformations
  # on fixture data and the generated record(s), if any.
  module Middleware
    autoload :Base,        'fixtures/middleware/base'
    autoload :Builder,     'fixtures/middleware/builder'
    autoload :FormatText,  'fixtures/middleware/format_text'
    autoload :SetPassword, 'fixtures/middleware/set_password'
    autoload :SetSource,   'fixtures/middleware/set_source'

    def self.apply(command:, middleware:)
      return command if middleware.empty?

      middleware.reverse_each.reduce(command) do |next_command, cmd|
        cmd.curry(next_command)
      end
    end
  end
end
