# frozen_string_literal: true

# Namespace for fixtures, which handle reading data from a serialized source and
# hydrating the database.
module Fixtures
  def self.build(record_class, environment: 'fixtures')
    Builder.new(record_class, environment: environment).build
  end

  def self.create(record_class, environment: 'fixtures')
    Builder.new(record_class, environment: environment).create
  end

  def self.read(record_class, environment: 'fixtures')
    Builder.new(record_class, environment: environment).read
  end

  autoload :Builder, 'fixtures/builder'
end
