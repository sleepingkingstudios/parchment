# frozen_string_literal: true

# Namespace for fixtures, which handle reading data from a serialized source and
# hydrating the database.
module Fixtures
  def self.build(record_class, count: nil, environment: 'fixtures')
    Builder.new(record_class, environment: environment).build(count: count)
  end

  def self.create(record_class, count: nil, environment: 'fixtures')
    Builder.new(record_class, environment: environment).create(count: count)
  end

  def self.read(record_class, count: nil, environment: 'fixtures')
    Builder.new(record_class, environment: environment).read(count: count)
  end

  autoload :Builder, 'fixtures/builder'
end
