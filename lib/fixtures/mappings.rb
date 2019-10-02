# frozen_string_literal: true

module Fixtures
  # Namespace for fixture mappings, which define transformations on fixture
  # data (such as cleaning up multiline strings).
  module Mappings
    autoload :TrimParagraphs, 'fixtures/mappings/trim_paragraphs'
  end
end
