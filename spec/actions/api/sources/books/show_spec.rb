# frozen_string_literal: true

require 'rails_helper'

require 'cuprum/rails/repository'
require 'cuprum/rails/rspec/actions/show_contracts'

require 'actions/api/sources/books/show'

require 'fixtures/builder'

RSpec.describe Actions::Api::Sources::Books::Show do
  include Cuprum::Rails::RSpec::Actions::ShowContracts

  subject(:action) do
    described_class.new(repository: repository, resource: resource)
  end

  let(:repository) { Cuprum::Rails::Repository.new }
  let(:resource) do
    Cuprum::Rails::Resource.new(
      collection:           repository.find_or_create(record_class: Book),
      resource_class: Book
    )
  end
  let(:book) { Fixtures.build(Book, count: 1).first }

  before(:example) { book.save! }

  include_contract 'show action contract',
    existing_entity:   -> { book },
    primary_key_value: -> { SecureRandom.uuid }
end
